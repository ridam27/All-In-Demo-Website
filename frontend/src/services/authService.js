import { supabase } from "@/lib/supabaseClient";

export async function login(email, password) {
    const normalizedEmail = String(email || "")
        .trim()
        .toLowerCase();

    if (!normalizedEmail || !password) {
        throw new Error("Email and password are required.");
    }

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
        });

    if (error) {
        throw new Error("Invalid email or password.");
    }

    if (!data.session || !data.user) {
        throw new Error("Unable to create an authenticated session.");
    }

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error("Unable to sign out.");
    }
}

export async function getSession() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error) {
        throw new Error("Unable to read authentication session.");
    }

    return session;
}

export async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        return null;
    }

    return user;
}

export async function getAccessToken() {
    const session = await getSession();
    return session?.access_token ?? null;
}