import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import "./AdminProfileTable.css";

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function AdminProfileTable({ profiles = [] }) {
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
            <div className="admin-profile-table__header">
                <span>Profile</span>
                <span>Status</span>
                <span>Updated</span>
                <span aria-hidden="true" />
            </div>

            <div className="admin-profile-table__body">
                {profiles.map((profile) => (
                    <Link
                        key={profile.username}
                        href={`/admin/profiles/${encodeURIComponent(profile.username)}`}
                        className="admin-profile-table__row"
                    >
                        <div className="admin-profile-table__identity">
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
                                    <span>{getInitials(profile.fullName)}</span>
                                )}
                            </div>

                            <div className="admin-profile-table__details">
                                <strong>{profile.fullName}</strong>
                                <span>@{profile.username}</span>
                            </div>
                        </div>

                        <span
                            className={`admin-profile-table__status ${profile.isPublic ? "is-public" : "is-private"
                                }`}
                        >
                            {profile.isPublic ? "Public" : "Private"}
                        </span>

                        <span className="admin-profile-table__updated">
                            {profile.updatedAt || "Unknown"}
                        </span>

                        <FiArrowUpRight
                            className="admin-profile-table__arrow"
                            aria-hidden="true"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}