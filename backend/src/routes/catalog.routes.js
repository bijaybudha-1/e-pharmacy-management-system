import Router from "express";
import {
  createCategories,
  getAllCategories,
  updateCategory,
} from "../controllers/catalog.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  createCategoryRequestBodySchema,
  updateCategoryRequestBodySchema,
} from "../validators/catalog.validation.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
const router = Router();

// Public Route
router.route("/categories").get(getAllCategories);

// Protected Admin Route
router
  .route("/categories")
  .post(
    authMiddleware,
    authorizeRole(["admin"]),
    validate(createCategoryRequestBodySchema),
    createCategories,
  );

router
  .route("/categories/:categoryId")
  .patch(
    authMiddleware,
    authorizeRole(["admin"]),
    validate(updateCategoryRequestBodySchema),
    updateCategory,
  );

export default router;
