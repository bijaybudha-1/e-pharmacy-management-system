import { Router } from "express";
import {
  addAddress,
  getOwnAddress,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { addAddressRequestBodySchema } from "../validators/addresses.validation.js";

const router = Router();

// secured Router
router.route("/").get(authMiddleware, getOwnAddress);
router
  .route("/")
  .post(authMiddleware, validate(addAddressRequestBodySchema), addAddress);

export default router;
