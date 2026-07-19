import "dotenv/config";

import app from "./app.js";
import { testSupabaseConnection } from "./config/supabase.js";

const port = Number(process.env.PORT) || 5000;

async function startServer() {
    try {
        await testSupabaseConnection();

        console.log("Supabase connected successfully.");

        app.listen(port, () => {
            console.log(`Backend running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

startServer();