const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function adminRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
        cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Admin request failed.");
    }

    return payload;
}

export async function getAdminProfiles() {
    const payload = await adminRequest("/admin/profiles");
    return payload.data;
}

export async function getAdminProfile(username) {
    const normalizedUsername = String(username || "").trim().toLowerCase();

    if (!normalizedUsername) {
        return null;
    }

    try {
        const payload = await adminRequest(
            `/admin/profiles/${encodeURIComponent(normalizedUsername)}`
        );

        return payload.data;
    } catch (error) {
        if (error.message === "Profile not found.") {
            return null;
        }

        throw error;
    }
}

export async function createAdminProfile(profile) {
    const payload = await adminRequest("/admin/profiles", {
        method: "POST",
        body: JSON.stringify(profile),
    });

    return payload.data;
}

export async function updateAdminProfile(currentUsername, profile) {
    const normalizedUsername = String(currentUsername || "")
        .trim()
        .toLowerCase();

    const payload = await adminRequest(
        `/admin/profiles/${encodeURIComponent(normalizedUsername)}`,
        {
            method: "PUT",
            body: JSON.stringify(profile),
        }
    );

    return payload.data;
}

export async function deleteAdminProfile(username) {
    const normalizedUsername = String(username || "").trim().toLowerCase();

    await adminRequest(
        `/admin/profiles/${encodeURIComponent(normalizedUsername)}`,
        {
            method: "DELETE",
        }
    );
}