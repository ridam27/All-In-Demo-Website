"use client";

import { FiSearch } from "react-icons/fi";

import "./AdminTopbar.css";

export default function AdminTopbar({
    title = "Dashboard",
    subtitle = "Welcome back",
}) {
    return (
        <header className="admin-topbar">
            <div className="admin-topbar__left">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div className="admin-topbar__right">
                <div className="admin-search">
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search profiles..."
                    />
                </div>

                <button
                    type="button"
                    className="admin-user"
                >
                    <div className="admin-user__avatar">
                        R
                    </div>

                    <div className="admin-user__info">
                        <strong>Ridam</strong>
                        <span>Administrator</span>
                    </div>
                </button>
            </div>
        </header>
    );
}