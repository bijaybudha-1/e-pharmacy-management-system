import { Router } from "express";
import {
  addAddress,
  getOwnAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  addAddressRequestBodySchema,
  updateAddressRequestBodySchema,
} from "../validators/addresses.validation.js";

const router = Router();

// secured Router
router.route("/").get(authMiddleware, getOwnAddress);
router
  .route("/")
  .post(authMiddleware, validate(addAddressRequestBodySchema), addAddress);
router
  .route("/:addressId")
  .patch(
    authMiddleware,
    validate(updateAddressRequestBodySchema),
    updateAddress,
  );

export default router;
