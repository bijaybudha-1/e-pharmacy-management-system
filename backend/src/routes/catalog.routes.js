import Router from "express";
import { getAllCategories } from "../controllers/catalog.controller.js";

const router = Router();

router.route("/categories").get(getAllCategories);

export default router;
