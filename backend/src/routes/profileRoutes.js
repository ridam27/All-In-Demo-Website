import express from "express";
import { getProfileByUsername, } from "../controllers/profileController.js";
import { downloadContact, } from "../controllers/contactController.js";

const router = express.Router();

router.get("/:username", getProfileByUsername);

router.get("/:username/contact", downloadContact);

export default router;