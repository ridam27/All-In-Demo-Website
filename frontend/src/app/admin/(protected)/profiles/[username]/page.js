import { notFound } from "next/navigation";

import AdminProfileForm from "@/components/Admin/AdminProfileForm/AdminProfileForm";
import { getAdminProfile } from "@/services/adminService";

export default async function EditProfilePage({ params }) {
    const { username } = await params;
    const profile = await getAdminProfile(username);

    if (!profile) {
        notFound();
    }

    return (
        <AdminProfileForm
            mode="edit"
            initialProfile={profile}
            originalUsername={username}
        />
    );
}