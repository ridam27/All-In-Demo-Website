import { supabase } from "../config/supabase.js";

const USERNAME_PATTERN = /^[a-z0-9][a-z0-9_-]{2,29}$/;

const PROFILE_SELECT = `
  id,
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
  website_url,
  is_public,
  created_at,
  updated_at
`;

function cleanOptionalString(value) {
    if (typeof value !== "string") return null;

    const cleaned = value.trim();
    return cleaned || null;
}

function mapProfile(profile) {
    return {
        id: profile.id,
        username: profile.username,
        fullName: profile.full_name,
        professionalTitle: profile.professional_title,
        bio: profile.bio,
        phone: profile.phone,
        email: profile.email,
        whatsapp: profile.whatsapp,
        profilePhoto: profile.profile_photo_url,
        bannerImage: profile.banner_image_url,
        isPublic: profile.is_public,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        socialLinks: {
            linkedin: profile.linkedin_url,
            github: profile.github_url,
            instagram: profile.instagram_url,
            x: profile.x_url,
            youtube: profile.youtube_url,
            website: profile.website_url,
        },
    };
}

function validateProfile(body) {
    const username = String(body.username || "")
        .trim()
        .toLowerCase();

    const fullName = String(body.fullName || "").trim();
    const professionalTitle = String(
        body.professionalTitle || ""
    ).trim();

    const bio = cleanOptionalString(body.bio);
    const email = cleanOptionalString(body.email);

    if (!USERNAME_PATTERN.test(username)) {
        return {
            error:
                "Username must be 3–30 characters and contain only lowercase letters, numbers, hyphens or underscores.",
        };
    }

    if (fullName.length < 2 || fullName.length > 100) {
        return {
            error: "Full name must be between 2 and 100 characters.",
        };
    }

    if (
        professionalTitle.length < 2 ||
        professionalTitle.length > 120
    ) {
        return {
            error:
                "Professional title must be between 2 and 120 characters.",
        };
    }

    if (bio && bio.length > 500) {
        return {
            error: "Bio cannot exceed 500 characters.",
        };
    }

    if (email && email.length > 254) {
        return {
            error: "Email address is too long.",
        };
    }

    return {
        value: {
            username,
            full_name: fullName,
            professional_title: professionalTitle,
            bio,
            phone: cleanOptionalString(body.phone),
            email,
            whatsapp: cleanOptionalString(body.whatsapp),
            profile_photo_url: cleanOptionalString(body.profilePhoto),
            banner_image_url: cleanOptionalString(body.bannerImage),
            linkedin_url: cleanOptionalString(
                body.socialLinks?.linkedin
            ),
            github_url: cleanOptionalString(body.socialLinks?.github),
            instagram_url: cleanOptionalString(
                body.socialLinks?.instagram
            ),
            x_url: cleanOptionalString(body.socialLinks?.x),
            youtube_url: cleanOptionalString(
                body.socialLinks?.youtube
            ),
            website_url: cleanOptionalString(
                body.socialLinks?.website
            ),
            is_public: body.isPublic !== false,
        },
    };
}

export async function getAdminProfiles(req, res) {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select(PROFILE_SELECT)
            .order("updated_at", { ascending: false });

        if (error) {
            console.error("Admin profile list failed:", error.message);

            return res.status(500).json({
                success: false,
                message: "Unable to load profiles.",
            });
        }

        return res.status(200).json({
            success: true,
            data: data.map(mapProfile),
        });
    } catch (error) {
        console.error("Unexpected profile list error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function getAdminProfile(req, res) {
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
            .select(PROFILE_SELECT)
            .eq("username", username)
            .maybeSingle();

        if (error) {
            console.error("Admin profile fetch failed:", error.message);

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
            data: mapProfile(data),
        });
    } catch (error) {
        console.error("Unexpected admin profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function createAdminProfile(req, res) {
    try {
        const validation = validateProfile(req.body);

        if (validation.error) {
            return res.status(400).json({
                success: false,
                message: validation.error,
            });
        }

        const { data, error } = await supabase
            .from("profiles")
            .insert(validation.value)
            .select(PROFILE_SELECT)
            .single();

        if (error) {
            if (error.code === "23505") {
                return res.status(409).json({
                    success: false,
                    message: "This username is already in use.",
                });
            }

            console.error("Profile creation failed:", error.message);

            return res.status(500).json({
                success: false,
                message: "Unable to create profile.",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Profile created successfully.",
            data: mapProfile(data),
        });
    } catch (error) {
        console.error("Unexpected profile creation error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function updateAdminProfile(req, res) {
    try {
        const currentUsername = String(req.params.username || "")
            .trim()
            .toLowerCase();

        if (!USERNAME_PATTERN.test(currentUsername)) {
            return res.status(400).json({
                success: false,
                message: "Invalid current username.",
            });
        }

        const validation = validateProfile(req.body);

        if (validation.error) {
            return res.status(400).json({
                success: false,
                message: validation.error,
            });
        }

        const { data, error } = await supabase
            .from("profiles")
            .update(validation.value)
            .eq("username", currentUsername)
            .select(PROFILE_SELECT)
            .maybeSingle();

        if (error) {
            if (error.code === "23505") {
                return res.status(409).json({
                    success: false,
                    message: "The new username is already in use.",
                });
            }

            console.error("Profile update failed:", error.message);

            return res.status(500).json({
                success: false,
                message: "Unable to update profile.",
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
            message: "Profile updated successfully.",
            data: mapProfile(data),
        });
    } catch (error) {
        console.error("Unexpected profile update error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export async function deleteAdminProfile(req, res) {
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
            .delete()
            .eq("username", username)
            .select("id, username")
            .maybeSingle();

        if (error) {
            console.error("Profile deletion failed:", error.message);

            return res.status(500).json({
                success: false,
                message: "Unable to delete profile.",
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
            message: "Profile deleted successfully.",
        });
    } catch (error) {
        console.error("Unexpected profile deletion error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}