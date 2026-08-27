import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { userTable } from "../models/index.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { roleTable } from "../models/index.js";
import bcrypt from "bcrypt";

const userRegister = asyncHandler(async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  const existingUser = await db
    .select({
      email: userTable.email,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  if (existingUser.length > 0) {
    throw new ApiError(400, `User with email ${email} already exists!`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultFullName = email.split("@")[0];

  const [defaultUserRole] = await db
    .select({
      roleId: roleTable.id,
    })
    .from(roleTable)
    .where(eq(roleTable.roleName, "customer"));

  if (!defaultUserRole.roleId) {
    throw new ApiError(500, "Customer role is not found");
  }

  const [user] = await db
    .insert(userTable)
    .values({
      email,
      fullName: defaultFullName,
      password: hashedPassword,
      roleId: defaultUserRole.roleId,
    })
    .returning({ userId: userTable.id });

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
  if (!email) {
    throw new ApiError(401, "Email is invalid");
  }

  if (!password) {
    throw new ApiError(401, "Password is invalid");
  }

  const [existingUser] = await db
    .select({
      userId: userTable.id,
      fullName: userTable.fullName,
      email: userTable.email,
      password: userTable.password,
      roleId: userTable.roleId,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!existingUser) {
    throw new ApiError(401, "Email does not exists");
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid password");
  }

  const payload = {
    userId: existingUser.id,
    email: existingUser.email,
    fullName: existingUser.fullName,
    userId: existingUser.roleId,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, { data: payload }, "User Login Successfully"));
});

export { userRegister, userLogin };
