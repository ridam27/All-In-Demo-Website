import { supabase } from "../config/supabase.js";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9_-]{2,29}$/;

export async function getProfileByUsername(req, res) {
    try {
        const username = String(req.params.username || "")
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
            .select(`
        username,
        full_name,
        professional_title,
        bio,
        phone,
        email,
        whatsapp,
        profile_photo_url,
        banner_image_url,
        linkedin_url,
        github_url,
        instagram_url,
        x_url,
        youtube_url,
        website_url
      `)
            .eq("username", username)
            .eq("is_public", true)
            .maybeSingle();

        if (error) {
            console.error("Profile fetch failed:", error.message);

            return res.status(500).json({
                success: false,
                message: "Unable to load profile.",
            });
        }

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                username: data.username,
                fullName: data.full_name,
                professionalTitle: data.professional_title,
                bio: data.bio,
                phone: data.phone,
                email: data.email,
                whatsapp: data.whatsapp,
                profilePhoto: data.profile_photo_url,
                bannerImage: data.banner_image_url,
                socialLinks: {
                    linkedin: data.linkedin_url,
                    github: data.github_url,
                    instagram: data.instagram_url,
                    x: data.x_url,
                    youtube: data.youtube_url,
                    website: data.website_url,
                },
            },
        });
    } catch (error) {
        console.error("Unexpected profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}