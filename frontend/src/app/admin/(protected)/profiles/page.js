"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiPlus, FiSearch } from "react-icons/fi";

import AdminProfileTable from "@/components/Admin/AdminProfileTable/AdminProfileTable";
import { getAdminProfiles } from "@/services/adminService";

import "./profiles.css";

function formatUpdatedDate(value) {
    if (!value) return "Unknown";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

export default function AdminProfilesPage() {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProfiles() {
            try {
                const data = await getAdminProfiles();

                if (!active) return;

                setProfiles(
                    data.map((profile) => ({
                        ...profile,
                        updatedAt: formatUpdatedDate(profile.updatedAt),
                    }))
                );

                setStatus("success");
            } catch (error) {
                if (!active) return;

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to load profiles."
                );

                setStatus("error");
            }
        }

        loadProfiles();

        return () => {
            active = false;
        };
    }, []);

    const filteredProfiles = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return profiles;
        }

        return profiles.filter((profile) => {
            const fullName = String(profile.fullName || "").toLowerCase();
            const username = String(profile.username || "").toLowerCase();

            return (
                fullName.includes(query) ||
                username.includes(query)
            );
        });
    }, [profiles, search]);

    function handleProfileDeleted(username) {
        setProfiles((currentProfiles) =>
            currentProfiles.filter(
                (profile) => profile.username !== username
            )
        );
    }

    return (
        <section className="admin-profiles">
            <header className="admin-profiles__header">
                <div>
                    <span className="admin-profiles__eyebrow">
                        Profile management
                    </span>

                    <h2 className="admin-title">Profiles</h2>

                    <p className="admin-subtitle">
                        Create and manage NFC user profiles.
                    </p>
                </div>

                <Link
                    href="/admin/profiles/new"
                    className="admin-btn admin-btn--primary"
                >
                    <FiPlus aria-hidden="true" />
                    New Profile
                </Link>
            </header>

            <div className="admin-profiles__toolbar">
                <label className="admin-profiles__search">
                    <FiSearch aria-hidden="true" />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name or username..."
                        aria-label="Search profiles"
                    />
                </label>

                <span className="admin-profiles__count">
                    {filteredProfiles.length} profile
                    {filteredProfiles.length === 1 ? "" : "s"}
                </span>
            </div>

            {status === "loading" && (
                <div className="admin-profiles__state admin-card">
                    Loading profiles...
                </div>
            )}

            {status === "error" && (
                <div
                    className="admin-profiles__state admin-profiles__state--error admin-card"
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}

            {status === "success" && (
                <AdminProfileTable
                    profiles={filteredProfiles}
                    onProfileDeleted={handleProfileDeleted}
                />
            )}
        </section>
    );
}