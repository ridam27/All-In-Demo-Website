import { supabase } from "../config/supabase.js";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9_-]{2,29}$/;

function escapeVCard(value = "") {
    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
}

export async function downloadContact(req, res) {
    try {
        const username = String(req.params.username)
            .trim()
            .toLowerCase();

        if (!USERNAME_PATTERN.test(username)) {
            return res.status(400).json({
                success: false,
                message: "Invalid username.",
            });
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("username", username)
            .eq("is_public", true)
            .maybeSingle();

        if (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to generate contact.",
            });
        }

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Profile not found.",
            });
        }

        const lines = [
            "BEGIN:VCARD",
            "VERSION:3.0",

            `FN:${escapeVCard(data.full_name)}`,

            `TITLE:${escapeVCard(data.professional_title || "")}`,

            data.phone
                ? `TEL;TYPE=CELL:${escapeVCard(data.phone)}`
                : null,

            data.email
                ? `EMAIL:${escapeVCard(data.email)}`
                : null,

            data.website_url
                ? `URL:${escapeVCard(data.website_url)}`
                : null,

            data.bio
                ? `NOTE:${escapeVCard(data.bio)}`
                : null,

            "END:VCARD",
        ].filter(Boolean);

        const vcf = lines.join("\r\n");

        res.setHeader(
            "Content-Type",
            "text/vcard; charset=utf-8"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${username}.vcf"`
        );

        return res.send(vcf);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}