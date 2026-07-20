"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiEye, FiSave, FiTrash2 } from "react-icons/fi";

import {
    createAdminProfile,
    updateAdminProfile,
    deleteAdminProfile,
} from "@/services/adminService";
import { SOCIAL_PLATFORMS } from "@/constants/socialPlatforms";

import "./AdminProfileForm.css";

const SOCIAL_KEYS = [
    "linkedin",
    "github",
    "instagram",
    "x",
    "youtube",
    "website",
];

const EMPTY_PROFILE = {
    username: "",
    fullName: "",
    professionalTitle: "",
    bio: "",
    phone: "",
    email: "",
    whatsapp: "",
    profilePhoto: "",
    bannerImage: "",
    isPublic: true,
    socialLinks: {
        linkedin: "",
        github: "",
        instagram: "",
        x: "",
        youtube: "",
        website: "",
    },
};

function normalizeProfile(profile = {}) {
    return {
        username: profile.username ?? "",
        fullName: profile.fullName ?? "",
        professionalTitle: profile.professionalTitle ?? "",
        bio: profile.bio ?? "",
        phone: profile.phone ?? "",
        email: profile.email ?? "",
        whatsapp: profile.whatsapp ?? "",
        profilePhoto: profile.profilePhoto ?? "",
        bannerImage: profile.bannerImage ?? "",
        isPublic:
            typeof profile.isPublic === "boolean"
                ? profile.isPublic
                : true,
        socialLinks: {
            linkedin: profile.socialLinks?.linkedin ?? "",
            github: profile.socialLinks?.github ?? "",
            instagram: profile.socialLinks?.instagram ?? "",
            x: profile.socialLinks?.x ?? "",
            youtube: profile.socialLinks?.youtube ?? "",
            website: profile.socialLinks?.website ?? "",
        },
    };
}

export default function AdminProfileForm({
    mode = "create",
    initialProfile = null,
    originalUsername = "",
}) {
    const router = useRouter();

    const initialValues = useMemo(
        () =>
            initialProfile
                ? normalizeProfile(initialProfile)
                : normalizeProfile(EMPTY_PROFILE),
        [initialProfile]
    );

    const [formData, setFormData] = useState(initialValues);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState("");

    function updateField(event) {
        const { name, value, type, checked } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function updateSocialLink(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            socialLinks: {
                ...current.socialLinks,
                [name]: value,
            },
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSaving(true);
        setMessage("");

        try {
            if (mode === "edit") {
                const currentUsername =
                    originalUsername || initialProfile?.username;

                const updatedProfile = await updateAdminProfile(
                    currentUsername,
                    formData
                );

                const normalizedUpdatedProfile =
                    normalizeProfile(updatedProfile);

                setFormData(normalizedUpdatedProfile);
                setMessage("Profile updated successfully.");

                if (
                    normalizedUpdatedProfile.username !==
                    currentUsername
                ) {
                    router.replace(
                        `/admin/profiles/${encodeURIComponent(
                            normalizedUpdatedProfile.username
                        )}`
                    );
                }

                router.refresh();
                return;
            }

            const createdProfile =
                await createAdminProfile(formData);

            router.push(
                `/admin/profiles/${encodeURIComponent(
                    createdProfile.username
                )}`
            );

            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to save profile."
            );
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete() {
        const username =
            originalUsername || initialProfile?.username;

        if (!username || mode !== "edit") {
            return;
        }

        const confirmed = window.confirm(
            `Delete @${username}? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);
        setMessage("");

        try {
            await deleteAdminProfile(username);

            router.replace("/admin/profiles");
            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to delete profile."
            );
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <form
            className="admin-profile-form"
            onSubmit={handleSubmit}
        >
            <header className="admin-profile-form__header">
                <div>
                    <Link
                        href="/admin/profiles"
                        className="admin-profile-form__back"
                    >
                        <FiArrowLeft aria-hidden="true" />
                        Back to Profiles
                    </Link>

                    <h2 className="admin-title">
                        {mode === "edit"
                            ? "Edit Profile"
                            : "Create Profile"}
                    </h2>

                    <p className="admin-subtitle">
                        {mode === "edit"
                            ? "Update this demo profile and its public information."
                            : "Create a new public NFC profile."}
                    </p>
                </div>

                <div className="admin-profile-form__header-actions">
                    {mode === "edit" && (
                        <button
                            type="button"
                            className="admin-btn admin-btn--danger"
                            onClick={handleDelete}
                            disabled={isSaving || isDeleting}
                        >
                            <FiTrash2 aria-hidden="true" />
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    )}

                    {mode === "edit" && formData.username && (
                        <Link
                            href={`/${encodeURIComponent(
                                formData.username
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn admin-btn--secondary"
                        >
                            <FiEye aria-hidden="true" />
                            View Profile
                        </Link>
                    )}

                    <button
                        type="submit"
                        className="admin-btn admin-btn--primary"
                        disabled={isSaving || isDeleting}
                    >
                        <FiSave aria-hidden="true" />

                        {isSaving
                            ? "Saving..."
                            : mode === "edit"
                                ? "Save Changes"
                                : "Create Profile"}
                    </button>
                </div>
            </header>

            {message && (
                <div
                    className="admin-profile-form__message"
                    role="status"
                >
                    {message}
                </div>
            )}

            <div className="admin-profile-form__layout">
                <div className="admin-profile-form__main">
                    <section className="admin-profile-form__section admin-card">
                        <div className="admin-profile-form__section-heading">
                            <span>01</span>

                            <div>
                                <h3>Basic Information</h3>
                                <p>
                                    Main details displayed at the top of the
                                    profile.
                                </p>
                            </div>
                        </div>

                        <div className="admin-profile-form__grid">
                            <label className="admin-profile-form__field">
                                <span>Full Name</span>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName ?? ""}
                                    onChange={updateField}
                                    className="admin-input"
                                    placeholder="Ridam Satkar"
                                    required
                                />
                            </label>

                            <label className="admin-profile-form__field">
                                <span>Username</span>

                                <div className="admin-profile-form__username">
                                    <span>@</span>

                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username ?? ""}
                                        onChange={updateField}
                                        placeholder="ridam27"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        required
                                    />
                                </div>
                            </label>

                            <label className="admin-profile-form__field admin-profile-form__field--full">
                                <span>Professional Title</span>

                                <input
                                    type="text"
                                    name="professionalTitle"
                                    value={
                                        formData.professionalTitle ?? ""
                                    }
                                    onChange={updateField}
                                    className="admin-input"
                                    placeholder="Full Stack Developer"
                                    required
                                />
                            </label>

                            <label className="admin-profile-form__field admin-profile-form__field--full">
                                <span>Short Bio</span>

                                <textarea
                                    name="bio"
                                    value={formData.bio ?? ""}
                                    onChange={updateField}
                                    className="admin-textarea"
                                    rows="5"
                                    maxLength="500"
                                    placeholder="Write a short introduction..."
                                />

                                <small>
                                    {(formData.bio ?? "").length}/500
                                    characters
                                </small>
                            </label>
                        </div>
                    </section>

                    <section className="admin-profile-form__section admin-card">
                        <div className="admin-profile-form__section-heading">
                            <span>02</span>

                            <div>
                                <h3>Contact Information</h3>
                                <p>
                                    Used for call, email, WhatsApp and contact
                                    saving.
                                </p>
                            </div>
                        </div>

                        <div className="admin-profile-form__grid">
                            <label className="admin-profile-form__field">
                                <span>Phone Number</span>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone ?? ""}
                                    onChange={updateField}
                                    className="admin-input"
                                    placeholder="+91 98765 43210"
                                />
                            </label>

                            <label className="admin-profile-form__field">
                                <span>Email Address</span>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email ?? ""}
                                    onChange={updateField}
                                    className="admin-input"
                                    placeholder="name@example.com"
                                />
                            </label>

                            <label className="admin-profile-form__field admin-profile-form__field--full">
                                <span>WhatsApp Number</span>

                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp ?? ""}
                                    onChange={updateField}
                                    className="admin-input"
                                    placeholder="919876543210"
                                />

                                <small>
                                    Include the country code without spaces or
                                    symbols.
                                </small>
                            </label>
                        </div>
                    </section>

                    <section className="admin-profile-form__section admin-card">
                        <div className="admin-profile-form__section-heading">
                            <span>03</span>

                            <div>
                                <h3>Social Links</h3>
                                <p>
                                    Empty links remain hidden from the public
                                    profile.
                                </p>
                            </div>
                        </div>

                        <div className="admin-profile-form__socials">
                            {SOCIAL_KEYS.map((key) => {
                                const platform =
                                    SOCIAL_PLATFORMS[key];

                                if (!platform) {
                                    return null;
                                }

                                const Icon = platform.icon;

                                return (
                                    <label
                                        key={key}
                                        className="admin-profile-form__social-field"
                                    >
                                        <span className="admin-profile-form__social-icon">
                                            <Icon aria-hidden="true" />
                                        </span>

                                        <div>
                                            <span>{platform.label}</span>

                                            <input
                                                type="url"
                                                name={key}
                                                value={
                                                    formData.socialLinks?.[key] ?? ""
                                                }
                                                onChange={updateSocialLink}
                                                className="admin-input"
                                                placeholder={
                                                    platform.placeholder ||
                                                    `https://${key}.com/username`
                                                }
                                            />
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <aside className="admin-profile-form__side">
                    <section className="admin-profile-form__section admin-card">
                        <div className="admin-profile-form__section-heading">
                            <span>04</span>

                            <div>
                                <h3>Images</h3>
                                <p>
                                    Uploads will be connected in the next
                                    step.
                                </p>
                            </div>
                        </div>

                        <label className="admin-profile-form__field">
                            <span>Profile Photo URL</span>

                            <input
                                type="url"
                                name="profilePhoto"
                                value={formData.profilePhoto ?? ""}
                                onChange={updateField}
                                className="admin-input"
                                placeholder="https://..."
                            />
                        </label>

                        <label className="admin-profile-form__field">
                            <span>Banner Image URL</span>

                            <input
                                type="url"
                                name="bannerImage"
                                value={formData.bannerImage ?? ""}
                                onChange={updateField}
                                className="admin-input"
                                placeholder="https://..."
                            />
                        </label>
                    </section>

                    <section className="admin-profile-form__section admin-card">
                        <div className="admin-profile-form__section-heading">
                            <span>05</span>

                            <div>
                                <h3>Visibility</h3>
                                <p>
                                    Control whether this profile can be
                                    opened publicly.
                                </p>
                            </div>
                        </div>

                        <label className="admin-profile-form__switch">
                            <div>
                                <strong>Public Profile</strong>

                                <span>
                                    Anyone with the profile URL can view
                                    this page.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={Boolean(formData.isPublic)}
                                onChange={updateField}
                            />

                            <span className="admin-profile-form__switch-control" />
                        </label>
                    </section>

                    <section className="admin-profile-form__summary admin-card">
                        <span>Profile URL</span>

                        <strong>
                            /{formData.username || "username"}
                        </strong>

                        <p>
                            This URL will be programmed into the NFC
                            card.
                        </p>
                    </section>
                </aside>
            </div>
        </form>
    );
}