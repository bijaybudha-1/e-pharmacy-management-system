import { Router } from "express";
import { getOwnAddress } from "../controllers/address.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

// secured Router
router.route("/").get(authMiddleware, getOwnAddress);

export default router;
