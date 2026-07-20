"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiFolder, FiSettings, FiLogOut } from "react-icons/fi";

import "./AdminSidebar.css";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
    { label: "Profiles", href: "/admin/profiles", icon: FiFolder },
];

const FOOTER_ITEMS = [
    { label: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__top">
                <Link href="/admin/dashboard" className="admin-sidebar__brand">
                    <Image
                        src="/brand/logo-dark.svg"
                        alt="All In"
                        width={145}
                        height={42}
                        priority
                    />
                    <span>Admin Panel</span>
                </Link>

                <nav className="admin-sidebar__nav">
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                        const active =
                            pathname === href || pathname.startsWith(`${href}/`);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`admin-sidebar__link ${active ? "is-active" : ""}`}
                            >
                                <Icon />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="admin-sidebar__bottom">
                <nav className="admin-sidebar__nav">
                    {FOOTER_ITEMS.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href} className="admin-sidebar__link">
                            <Icon />
                            <span>{label}</span>
                        </Link>
                    ))}

                    <button className="admin-sidebar__link admin-sidebar__logout">
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}