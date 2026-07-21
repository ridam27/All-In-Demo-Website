"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import { logout } from "@/services/authService";
import { verifyAdminAccess } from "@/services/adminService";

export default function ProtectedAdminLayout({
    children,
}) {
    const router = useRouter();
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;

        async function checkAdminAccess() {
            try {
                await verifyAdminAccess();

                if (active) {
                    setStatus("authenticated");
                }
            } catch {
                try {
                    await logout();
                } catch {
                    // Ignore logout failure during cleanup.
                }

                if (active) {
                    router.replace("/admin/login");
                }
            }
        }

        checkAdminAccess();

        return () => {
            active = false;
        };
    }, [router]);

    if (status === "checking") {
        return (
            <main className="admin-auth-loading">
                <p>Verifying administrator access...</p>
            </main>
        );
    }

    return <AdminLayout>{children}</AdminLayout>;
}