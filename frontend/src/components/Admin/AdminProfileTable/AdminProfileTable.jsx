"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowUpRight, FiTrash2 } from "react-icons/fi";

import { deleteAdminProfile } from "@/services/adminService";

import "./AdminProfileTable.css";

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function AdminProfileTable({
    profiles = [],
    onProfileDeleted,
}) {
    const [deletingUsername, setDeletingUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleDelete(profile) {
        const confirmed = window.confirm(
            `Delete @${profile.username}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeletingUsername(profile.username);
        setErrorMessage("");

        try {
            await deleteAdminProfile(profile.username);
            onProfileDeleted?.(profile.username);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to delete profile."
            );
        } finally {
            setDeletingUsername("");
        }
    }

    if (profiles.length === 0) {
        return (
            <div className="admin-profile-table__empty admin-card">
                <h3>No profiles found</h3>
                <p>Create your first demo profile to get started.</p>
            </div>
        );
    }

    return (
        <div className="admin-profile-table admin-card">
            {errorMessage && (
                <div className="admin-profile-table__error" role="alert">
                    {errorMessage}
                </div>
            )}

            <div className="admin-profile-table__header">
                <span>Profile</span>
                <span>Status</span>
                <span>Updated</span>
                <span>Actions</span>
            </div>

            <div className="admin-profile-table__body">
                {profiles.map((profile) => {
                    const isDeleting =
                        deletingUsername === profile.username;

                    return (
                        <div
                            key={profile.username}
                            className="admin-profile-table__row"
                        >
                            <Link
                                href={`/admin/profiles/${encodeURIComponent(
                                    profile.username
                                )}`}
                                className="admin-profile-table__identity"
                                aria-label={`Edit ${profile.fullName}`}
                            >
                                <div className="admin-profile-table__avatar">
                                    {profile.profilePhoto ? (
                                        <Image
                                            src={profile.profilePhoto}
                                            alt={`${profile.fullName}'s profile photo`}
                                            width={48}
                                            height={48}
                                            unoptimized
                                            className="admin-profile-table__avatar-image"
                                        />
                                    ) : (
                                        <span>
                                            {getInitials(profile.fullName)}
                                        </span>
                                    )}
                                </div>

                                <div className="admin-profile-table__details">
                                    <strong>{profile.fullName}</strong>
                                    <span>@{profile.username}</span>
                                </div>
                            </Link>

                            <span
                                className={`admin-profile-table__status ${profile.isPublic
                                        ? "is-public"
                                        : "is-private"
                                    }`}
                            >
                                {profile.isPublic ? "Public" : "Private"}
                            </span>

                            <span className="admin-profile-table__updated">
                                {profile.updatedAt || "Unknown"}
                            </span>

                            <div className="admin-profile-table__actions">
                                <Link
                                    href={`/admin/profiles/${encodeURIComponent(
                                        profile.username
                                    )}`}
                                    className="admin-profile-table__action admin-profile-table__action--edit"
                                    aria-label={`Edit ${profile.fullName}`}
                                    title="Edit profile"
                                >
                                    <FiArrowUpRight aria-hidden="true" />
                                </Link>

                                <button
                                    type="button"
                                    className="admin-profile-table__action admin-profile-table__action--delete"
                                    onClick={() => handleDelete(profile)}
                                    disabled={isDeleting}
                                    aria-label={`Delete ${profile.fullName}`}
                                    title="Delete profile"
                                >
                                    <FiTrash2 aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}