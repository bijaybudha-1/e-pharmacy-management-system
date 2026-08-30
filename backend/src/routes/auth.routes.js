import { Router } from "express";
import {
  forgotPasswordRequest,
  getCurrentUser,
  refreshAccessToken,
  resendVerifyEmail,
  resetForgotPassword,
  userLogin,
  userLogout,
  userRegister,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  forgotPasswordRequestBodySchema,
  loginPostRequestBodySchema,
  registerPostRequestBodySchema,
  resetPasswordRequestBodySchema,
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
router
  .route("/forgot-password")
  .post(validate(forgotPasswordRequestBodySchema), forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(validate(resetPasswordRequestBodySchema), resetForgotPassword);

// Secure Route
router.route("/logout").post(authMiddleware, userLogout);
router.route("/current-user").get(authMiddleware, getCurrentUser);
router.route("/resend-verify-email").post(authMiddleware, resendVerifyEmail);

export default router;
