import { supabase } from "../config/supabase.js";

export async function requireAdmin(req, res, next) {
    try {
        const authorization =
            req.headers.authorization || "";

        if (!authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const accessToken = authorization
            .slice("Bearer ".length)
            .trim();

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(accessToken);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired session.",
            });
        }

        const adminEmail = String(
            process.env.ADMIN_EMAIL || ""
        )
            .trim()
            .toLowerCase();

        const userEmail = String(user.email || "")
            .trim()
            .toLowerCase();

        if (!adminEmail) {
            console.error(
                "ADMIN_EMAIL is missing from backend environment."
            );

            return res.status(500).json({
                success: false,
                message:
                    "Server authentication is not configured.",
            });
        }

        if (!userEmail || userEmail !== adminEmail) {
            return res.status(403).json({
                success: false,
                message: "Administrator access required.",
            });
        }

        req.admin = {
            id: user.id,
            email: userEmail,
        };

        return next();
    } catch (error) {
        console.error(
            "Admin authentication middleware failed:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to verify administrator access.",
        });
    }
}