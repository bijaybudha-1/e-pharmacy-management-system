import { and, eq, gt } from "drizzle-orm";
import db from "../db/index.js";
import { roleTable, userTable } from "../models/index.js";
import bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
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

  return existingUser;
};

const createUser = async (
  email,
  fullName,
  password,
  roleId,
  emailValidationToken,
  emailValidationTokenExpiry,
) => {
  const [user] = await db
    .insert(userTable)
    .values({
      email,
      fullName,
      password,
      roleId,
      emailValidationToken,
      emailValidationTokenExpiry,
    })
    .returning({
      userId: userTable.id,
      email: userTable.email,
      fullName: userTable.fullName,
    });

  return user;
};

const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const getDefaultRoleId = async () => {
  const [defaultId] = await db
    .select({
      roleId: roleTable.id,
    })
    .from(roleTable)
    .where(eq(roleTable.roleName, "customer"));

  return defaultId.roleId;
};

const getUserByValidEmailVerificationToken = async (hashedToken) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.emailValidationToken, hashedToken),
        gt(userTable.emailValidationTokenExpiry, new Date()),
      ),
    )
    .limit(1);

  return user;
};

const updateEmailVerified = async (userId) => {
  const [emailVerified] = await db
    .update(userTable)
    .set({
      emailVerified: true,
      emailValidationToken: null,
      emailValidationTokenExpiry: null,
    })
    .where(eq(userTable.id, userId))
    .returning();

  return emailVerified;
};

const updateRefreshToken = async (userId, refreshToken) => {
  const updatedUser = await db
    .update(userTable)
    .set({
      refreshToken: refreshToken,
    })
    .where(eq(userTable.id, userId))
    .returning();

  console.log("User ID: ", userId);
  console.log("Refresh Token: ", refreshToken);

  return updatedUser;
};

export {
  getUserByEmail,
  createUser,
  getHashedPassword,
  getDefaultRoleId,
  comparePassword,
  getUserByValidEmailVerificationToken,
  updateEmailVerified,
  updateRefreshToken,
};
