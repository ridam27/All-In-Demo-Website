const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProfile(username) {
    const normalizedUsername = String(username || "")
        .trim()
        .toLowerCase();

    if (!normalizedUsername) {
        return null;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/profiles/${encodeURIComponent(normalizedUsername)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        const payload = await response.json().catch(() => null);

        if (response.status === 404) {
            return null;
        }

        if (!response.ok || !payload?.success) {
            throw new Error(payload?.message || "Unable to load profile.");
        }

        return payload.data;
    } catch (error) {
        console.error("Profile request failed:", error.message);
        throw error;
    }
}