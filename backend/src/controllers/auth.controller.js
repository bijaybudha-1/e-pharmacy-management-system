import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  addForgotPasswordAndExpiryToken,
  comparePassword,
  createUser,
  getDefaultRole,
  getHashedPassword,
  getResetForgotPassword,
  getUserByEmail,
  getUserById,
  getUserByIdAndUpdate,
  getUserByValidEmailVerificationToken,
  updateEmailVerificationToken,
  updateEmailVerified,
  updatePassword,
  updateRefreshToken,
  updateResetForgotPassword,
} from "../services/auth.service.js";
import {
  decodedJwtToken,
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
  getHashedToken,
} from "../services/token.service.js";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
} from "../utils/mailGenerator.js";

const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, `User with ${email} email is already registered`);
  }

  const hashedPassword = await getHashedPassword(password);

  const defaultFullName = email.split("@")[0];

  const defaultUserRoleId = await getDefaultRole();

  if (!defaultUserRoleId.roleId) {
    throw new ApiError(500, "Customer role is not configured");
  }

  const {
    unHashedToken,
    hashedToken: emailValidationToken,
    tokenExpiry: emailValidationTokenExpiry,
  } = await generateTemporaryToken();

  const user = await createUser(
    email,
    defaultFullName,
    hashedPassword,
    defaultUserRoleId.roleId,
    emailValidationToken,
    emailValidationTokenExpiry,
  );

  if (!user?.userId) {
    throw new ApiError(500, "Failed to create user");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { userId: user.userId },
        "Register user account successfully and Verification email has been send on your email",
      ),
    );

  await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`,
    ),
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(400, "Email Verification token is missing");
  }

  const hashedToken = getHashedToken(verificationToken);

  const user = await getUserByValidEmailVerificationToken(hashedToken);

  if (!user) {
    throw new ApiError(400, "Invalid or expired email verification token");
  }

  const updatedUser = await updateEmailVerified(user.id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { verifyEmail: updatedUser.emailVerified },
        "Email is verified",
      ),
    );
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email) {
    throw new ApiError(401, "Email does not exists");
  }

  const isValidPassword = await comparePassword(
    password,
    existingUser.password,
  );

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid password");
  }

  const payload = {
    userId: existingUser.userId,
    email: existingUser.email,
    fullName: existingUser.fullName,
    roleId: existingUser.roleId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(existingUser.userId);

  const saveRefreshToken = await updateRefreshToken(
    existingUser.userId,
    refreshToken,
  );

  if (!saveRefreshToken) {
    throw new ApiError(500, "Failed to update refresh token");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken: accessToken },
        "User Login Successfully",
      ),
    );
});

const userLogout = asyncHandler(async (req, res) => {
  await getUserByIdAndUpdate(req.user?.id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetch successfully"));
});

const resendVerifyEmail = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user?.id);

  if (user.emailVerified) {
    throw new ApiError(409, "Email is already verified");
  }

  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  const updatedUser = await updateEmailVerificationToken(
    user.id,
    hashedToken,
    tokenExpiry,
  );

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Mail has been send your email id"));

  await sendEmail({
    email: updatedUser.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`,
    ),
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decodedToken;
  try {
    decodedToken = decodedJwtToken(incomingRefreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await getUserById(decodedToken?.id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const payload = {
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    roleId: user.roleId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(user.id);

  await updateRefreshToken(user.id, refreshToken);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed successfully",
      ),
    );
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(404, `User email ${email} with does not exist`);
  }

  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  await addForgotPasswordAndExpiryToken(user.userId, hashedToken, tokenExpiry);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { resetToken: unHashedToken },
        "Password reset mail has been send on your mail id",
      ),
    );

  await sendEmail({
    email: user.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${unHashedToken}`,
    ),
  });
});

const resetForgotPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = getHashedToken(resetToken);

  const validToken = await getResetForgotPassword(hashedToken);

  if (!validToken) {
    throw new ApiError(400, "Token is invalid or expired");
  }

  const hashedPassword = await getHashedPassword(password);
  await updateResetForgotPassword(validToken.id, hashedPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await getUserById(req.user?.id);

  const isPasswordValid = await comparePassword(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  const hashesPassword = await getHashedPassword(newPassword);

  await updatePassword(user.id, hashesPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  userRegister,
  userLogin,
  verifyEmail,
  userLogout,
  getCurrentUser,
  resendVerifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  changePassword,
};
