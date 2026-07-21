import express from "express";

import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/session", requireAdmin, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            authenticated: true,
            admin: {
                id: req.admin.id,
                email: req.admin.email,
            },
        },
    });
});

export default router;