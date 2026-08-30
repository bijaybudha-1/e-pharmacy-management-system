import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  comparePassword,
  createUser,
  getDefaultRoleId,
  getHashedPassword,
  getUserByEmail,
  getUserById,
  getUserByIdAndUpdate,
  getUserByValidEmailVerificationToken,
  updateEmailVerificationToken,
  updateEmailVerified,
  updateRefreshToken,
} from "../services/auth.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
  getHashedToken,
} from "../services/token.service.js";
import {
  emailVerificationMailgenContent,
  sendEmail,
} from "../utils/mailGenerator.js";

const userRegister = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, `User with email ${email} already exists!`);
  }

  const hashedPassword = await getHashedPassword(password);

  const defaultFullName = email.split("@")[0];

  const defaultUserRoleId = await getDefaultRoleId();

  if (!defaultUserRoleId) {
    throw new ApiError(500, "Customer role is not found");
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
    defaultUserRoleId,
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

  if (
    !user.emailValidationTokenExpiry ||
    user.emailValidationTokenExpiry < new Date()
  ) {
    throw new ApiError(400, "Verification token has expired");
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

export {
  userRegister,
  userLogin,
  verifyEmail,
  userLogout,
  getCurrentUser,
  resendVerifyEmail,
};
