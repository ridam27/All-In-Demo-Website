"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    FiArrowUpRight,
    FiEye,
    FiEyeOff,
    FiPlus,
    FiUsers,
} from "react-icons/fi";

import { getAdminProfiles } from "@/services/adminService";

import "./dashboard.css";

function formatUpdatedDate(value) {
    if (!value) return "Unknown";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    const now = new Date();
    const difference = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (difference >= 0 && difference < oneDay) {
        return "Today";
    }

    if (difference >= oneDay && difference < oneDay * 2) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

function getInitials(name = "") {
    return String(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function AdminDashboardPage() {
    const [profiles, setProfiles] = useState([]);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function loadDashboard() {
            try {
                const data = await getAdminProfiles();

                if (!active) return;

                setProfiles(Array.isArray(data) ? data : []);
                setStatus("success");
            } catch (error) {
                if (!active) return;

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to load dashboard."
                );

                setStatus("error");
            }
        }

        loadDashboard();

        return () => {
            active = false;
        };
    }, []);

    const stats = useMemo(() => {
        const publicProfiles = profiles.filter(
            (profile) => profile.isPublic
        ).length;

        return [
            {
                label: "Total Profiles",
                value: profiles.length,
                description: "Demo profiles created",
                icon: FiUsers,
            },
            {
                label: "Public Profiles",
                value: publicProfiles,
                description: "Visible through public URLs",
                icon: FiEye,
            },
            {
                label: "Private Profiles",
                value: profiles.length - publicProfiles,
                description: "Hidden from public access",
                icon: FiEyeOff,
            },
        ];
    }, [profiles]);

    const recentProfiles = useMemo(() => {
        return [...profiles]
            .sort((first, second) => {
                const firstDate = new Date(first.updatedAt || 0).getTime();
                const secondDate = new Date(second.updatedAt || 0).getTime();

                return secondDate - firstDate;
            })
            .slice(0, 3);
    }, [profiles]);

    return (
        <section className="admin-dashboard">
            <header className="admin-dashboard__header">
                <div>
                    <span className="admin-dashboard__eyebrow">
                        Overview
                    </span>

                    <h2 className="admin-title">Dashboard</h2>

                    <p className="admin-subtitle">
                        Manage your demo NFC profiles from one place.
                    </p>
                </div>

                <Link
                    href="/admin/profiles/new"
                    className="admin-btn admin-btn--primary"
                >
                    <FiPlus aria-hidden="true" />
                    Create Profile
                </Link>
            </header>

            {status === "loading" && (
                <div className="admin-dashboard__state admin-card">
                    Loading dashboard...
                </div>
            )}

            {status === "error" && (
                <div
                    className="admin-dashboard__state admin-dashboard__state--error admin-card"
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}

            {status === "success" && (
                <>
                    <div className="admin-dashboard__stats">
                        {stats.map(
                            ({ label, value, description, icon: Icon }) => (
                                <article
                                    key={label}
                                    className="admin-dashboard__stat admin-card"
                                >
                                    <div className="admin-dashboard__stat-top">
                                        <span>{label}</span>

                                        <span className="admin-dashboard__stat-icon">
                                            <Icon aria-hidden="true" />
                                        </span>
                                    </div>

                                    <strong>{value}</strong>
                                    <p>{description}</p>
                                </article>
                            )
                        )}
                    </div>

                    <section className="admin-dashboard__recent admin-card">
                        <div className="admin-dashboard__section-header">
                            <div>
                                <h3>Recent Profiles</h3>
                                <p>Recently created or updated demo profiles.</p>
                            </div>

                            <Link href="/admin/profiles">
                                View all
                                <FiArrowUpRight aria-hidden="true" />
                            </Link>
                        </div>

                        {recentProfiles.length === 0 ? (
                            <div className="admin-dashboard__empty">
                                <h4>No profiles yet</h4>
                                <p>Create your first demo profile to get started.</p>
                            </div>
                        ) : (
                            <div className="admin-dashboard__profile-list">
                                {recentProfiles.map((profile) => (
                                    <Link
                                        key={profile.username}
                                        href={`/admin/profiles/${encodeURIComponent(
                                            profile.username
                                        )}`}
                                        className="admin-dashboard__profile-row"
                                    >
                                        <span className="admin-dashboard__avatar">
                                            {getInitials(profile.fullName)}
                                        </span>

                                        <div className="admin-dashboard__profile-info">
                                            <strong>{profile.fullName}</strong>
                                            <span>@{profile.username}</span>
                                        </div>

                                        <span className="admin-dashboard__updated">
                                            {formatUpdatedDate(profile.updatedAt)}
                                        </span>

                                        <FiArrowUpRight
                                            className="admin-dashboard__profile-arrow"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </section>
    );
}