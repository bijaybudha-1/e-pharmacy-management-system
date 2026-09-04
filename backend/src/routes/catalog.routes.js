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
const router = Router();

router.route("/categories").get(getAllCategories);
router
  .route("/categories")
  .post(
    authMiddleware,
    validate(createCategoryRequestBodySchema),
    createCategories,
  );
router
  .route("/categories/:categoryId")
  .patch(
    authMiddleware,
    validate(updateCategoryRequestBodySchema),
    updateCategory,
  );

export default router;
