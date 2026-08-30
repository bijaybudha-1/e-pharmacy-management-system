import { Router } from "express";
import {
  getCurrentUser,
  refreshAccessToken,
  resendVerifyEmail,
  userLogin,
  userLogout,
  userRegister,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  loginPostRequestBodySchema,
  registerPostRequestBodySchema,
} from "../validators/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

// UnSecure Route
router
  .route("/register")
  .post(validate(registerPostRequestBodySchema), userRegister);
router.route("/login").post(validate(loginPostRequestBodySchema), userLogin);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);

// Secure Route
router.route("/logout").post(authMiddleware, userLogout);
router.route("/current-user").get(authMiddleware, getCurrentUser);
router.route("/resend-verify-email").post(authMiddleware, resendVerifyEmail);

export default router;
