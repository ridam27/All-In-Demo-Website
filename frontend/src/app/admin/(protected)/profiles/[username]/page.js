"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminProfileForm from "@/components/Admin/AdminProfileForm/AdminProfileForm";
import { getAdminProfile } from "@/services/adminService";

export default function EditProfilePage() {
    const params = useParams();
    const router = useRouter();

    const username =
        typeof params?.username === "string"
            ? params.username
            : "";

    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            if (!username) {
                setStatus("error");
                setErrorMessage("Invalid profile username.");
                return;
            }

            try {
                const data = await getAdminProfile(username);

                if (!active) return;

                if (!data) {
                    router.replace("/admin/profiles");
                    return;
                }

                setProfile(data);
                setStatus("success");
            } catch (error) {
                if (!active) return;

                if (
                    error instanceof Error &&
                    error.message === "Authentication required."
                ) {
                    router.replace("/admin/login");
                    return;
                }

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to load profile."
                );

                setStatus("error");
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, [router, username]);

    if (status === "loading") {
        return (
            <div className="admin-card admin-profile-page-state">
                Loading profile...
            </div>
        );
    }

    if (status === "error") {
        return (
            <div
                className="admin-card admin-profile-page-state admin-profile-page-state--error"
                role="alert"
            >
                {errorMessage}
            </div>
        );
    }

    return (
        <AdminProfileForm
            mode="edit"
            initialProfile={profile}
            originalUsername={username}
        />
    );
}