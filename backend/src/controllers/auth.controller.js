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
    throw new ApiError();
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

export { userRegister };
