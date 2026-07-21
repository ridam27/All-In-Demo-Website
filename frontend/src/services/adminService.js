import { getAccessToken } from "./authService";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

async function adminRequest(path, options = {}) {
    const token = await getAccessToken();

    if (!token) {
        throw new Error("Authentication required.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.body
                ? { "Content-Type": "application/json" }
                : {}),
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
        cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        const error = new Error(
            payload?.message || "Admin request failed."
        );

        error.status = response.status;
        throw error;
    }

    return payload;
}

export async function verifyAdminAccess() {
    const payload = await adminRequest("/admin/auth/session");
    return payload.data;
}

export async function getAdminProfiles() {
    const payload = await adminRequest("/admin/profiles");
    return payload.data;
}

export async function getAdminProfile(username) {
    const normalizedUsername = String(username || "")
        .trim()
        .toLowerCase();

    if (!normalizedUsername) {
        return null;
    }

    try {
        const payload = await adminRequest(
            `/admin/profiles/${encodeURIComponent(
                normalizedUsername
            )}`
        );

        return payload.data;
    } catch (error) {
        if (error.status === 404) {
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

export async function updateAdminProfile(
    currentUsername,
    profile
) {
    const normalizedUsername = String(currentUsername || "")
        .trim()
        .toLowerCase();

    if (!normalizedUsername) {
        throw new Error("Current username is required.");
    }

    const payload = await adminRequest(
        `/admin/profiles/${encodeURIComponent(
            normalizedUsername
        )}`,
        {
            method: "PUT",
            body: JSON.stringify(profile),
        }
    );

    return payload.data;
}

export async function deleteAdminProfile(username) {
    const normalizedUsername = String(username || "")
        .trim()
        .toLowerCase();

    if (!normalizedUsername) {
        throw new Error("Username is required.");
    }

    const payload = await adminRequest(
        `/admin/profiles/${encodeURIComponent(
            normalizedUsername
        )}`,
        {
            method: "DELETE",
        }
    );

    return payload.data ?? null;
}