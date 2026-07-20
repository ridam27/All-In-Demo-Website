import Link from "next/link";
import {
    FiArrowUpRight,
    FiEye,
    FiEyeOff,
    FiPlus,
    FiUsers,
} from "react-icons/fi";

import "./dashboard.css";

const stats = [
    {
        label: "Total Profiles",
        value: "12",
        description: "Demo profiles created",
        icon: FiUsers,
    },
    {
        label: "Public Profiles",
        value: "10",
        description: "Visible through public URLs",
        icon: FiEye,
    },
    {
        label: "Private Profiles",
        value: "2",
        description: "Hidden from public access",
        icon: FiEyeOff,
    },
];

const recentProfiles = [
    {
        name: "Ridam Satkar",
        username: "ridam27",
        initials: "RS",
        updated: "Today",
    },
    {
        name: "Aman Jain",
        username: "aman",
        initials: "AJ",
        updated: "Yesterday",
    },
    {
        name: "Rahul Sharma",
        username: "rahul",
        initials: "RS",
        updated: "12 Jul",
    },
];

export default function AdminDashboardPage() {
    return (
        <section className="admin-dashboard">
            <header className="admin-dashboard__header">
                <div>
                    <span className="admin-dashboard__eyebrow">Overview</span>
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

            <div className="admin-dashboard__stats">
                {stats.map(({ label, value, description, icon: Icon }) => (
                    <article key={label} className="admin-dashboard__stat admin-card">
                        <div className="admin-dashboard__stat-top">
                            <span>{label}</span>

                            <span className="admin-dashboard__stat-icon">
                                <Icon aria-hidden="true" />
                            </span>
                        </div>

                        <strong>{value}</strong>
                        <p>{description}</p>
                    </article>
                ))}
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

                <div className="admin-dashboard__profile-list">
                    {recentProfiles.map((profile) => (
                        <Link
                            key={profile.username}
                            href={`/admin/profiles/${profile.username}`}
                            className="admin-dashboard__profile-row"
                        >
                            <span className="admin-dashboard__avatar">
                                {profile.initials}
                            </span>

                            <div className="admin-dashboard__profile-info">
                                <strong>{profile.name}</strong>
                                <span>@{profile.username}</span>
                            </div>

                            <span className="admin-dashboard__updated">
                                {profile.updated}
                            </span>

                            <FiArrowUpRight
                                className="admin-dashboard__profile-arrow"
                                aria-hidden="true"
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </section>
    );
}