import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
        "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in backend .env"
    );
}

export const supabase = createClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    }
);

export async function testSupabaseConnection() {
    const { error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

    if (error) {
        throw new Error("Supabase connection test failed.");
    }
}