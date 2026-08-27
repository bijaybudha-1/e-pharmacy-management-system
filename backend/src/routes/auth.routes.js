import { Router } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  loginPostRequestBodySchema,
  registerPostRequestBodySchema,
} from "../validators/auth.validation.js";

const router = Router();

router
  .route("/register")
  .post(validate(registerPostRequestBodySchema), userRegister);
router.route("/login").post(validate(loginPostRequestBodySchema), userLogin);

export default router;
