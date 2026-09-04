import Router from "express";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getAllMedicine,
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

// Public Categories Route
router.route("/categories").get(getAllCategories);

// Public Medicine Route
router.route("/medicines").get(getAllMedicine);

// Protected Admin Categories Route
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

router
  .route("/categories/:categoryId")
  .delete(authMiddleware, authorizeRole(["admin"]), deleteCategory);

// Protected Admin Medicine Categories
export default router;
