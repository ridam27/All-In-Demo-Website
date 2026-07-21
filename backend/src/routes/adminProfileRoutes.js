import express from "express";

import {
    createAdminProfile,
    deleteAdminProfile,
    getAdminProfile,
    getAdminProfiles,
    updateAdminProfile,
} from "../controllers/adminProfileController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", getAdminProfiles);
router.get("/:username", getAdminProfile);
router.post("/", createAdminProfile);
router.put("/:username", updateAdminProfile);
router.delete("/:username", deleteAdminProfile);

export default router;