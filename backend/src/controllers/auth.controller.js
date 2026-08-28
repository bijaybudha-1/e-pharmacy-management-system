import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  comparePassword,
  createUser,
  getDefaultRoleId,
  getHashedPassword,
  getUserByEmail,
} from "../services/auth.service.js";
import { generateTemporaryToken } from "../services/token.service.js";

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

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { userId: user.userId },
        "Register user account successfully",
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

  return res
    .status(200)
    .json(new ApiResponse(200, { data: payload }, "User Login Successfully"));
});

export { userRegister, userLogin };
