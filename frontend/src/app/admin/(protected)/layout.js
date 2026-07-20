import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";

export default function ProtectedAdminLayout({ children }) {
    return <AdminLayout>{children}</AdminLayout>;
}