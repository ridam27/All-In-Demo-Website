import AdminSidebar from "@/components/Admin/AdminSidebar/AdminSidebar";
import AdminTopbar from "@/components/Admin/AdminTopbar/AdminTopbar";

import "./AdminLayout.css";

export default function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-main">
                <AdminTopbar />

                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}