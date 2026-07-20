import cors from "cors";
import express from "express";

import profileRoutes from "./routes/profileRoutes.js";
import adminProfileRoutes from "./routes/adminProfileRoutes.js";

const app = express();

app.disable("x-powered-by");

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json({ limit: "50kb" }));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            status: "ok",
        },
    });
});

app.use("/api/profiles", profileRoutes);
app.use("/api/admin/profiles", adminProfileRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

app.use((error, req, res, next) => {
    console.error("Unhandled backend error:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
});

export default app;