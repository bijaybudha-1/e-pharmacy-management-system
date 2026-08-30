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

const getUserById = async (userId) => {
  const [user] = await db
    .select({
      id: userTable.id,
      fullName: userTable.fullName,
      email: userTable.email,
      emailVerified: userTable.emailVerified,
      refreshToken: userTable.refreshToken,
      roleId: userTable.roleId,
    })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);

  return user;
};

const getUserByIdAndUpdate = async (userId) => {
  const [user] = await db
    .update(userTable)
    .set({
      refreshToken: null,
    })
    .where(eq(userTable.id, userId))
    .returning();

  return user;
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

const updateEmailVerificationToken = async (
  userId,
  hashedToken,
  tokenExpiry,
) => {
  const [user] = await db
    .update(userTable)
    .set({
      emailValidationToken: hashedToken,
      emailValidationTokenExpiry: tokenExpiry,
    })
    .where(eq(userTable.id, userId))
    .returning();

  return user;
};

const updateRefreshToken = async (userId, refreshToken) => {
  const updatedUser = await db
    .update(userTable)
    .set({
      refreshToken: refreshToken,
    })
    .where(eq(userTable.id, userId))
    .returning();

  return updatedUser;
};

const addForgotPasswordAndExpiryToken = async (
  userId,
  forgotToken,
  forgotExpiry,
) => {
  const [updateForgotPasswordToken] = await db
    .update(userTable)
    .set({
      forgotPasswordToken: forgotToken,
      forgotPasswordExpiry: forgotExpiry,
    })
    .where(eq(userTable.id, userId))
    .returning();

  return updateForgotPasswordToken;
};

const getResetForgotPassword = async (hashedToken) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.forgotPasswordToken, hashedToken),
        gt(userTable.forgotPasswordExpiry, new Date()),
      ),
    )
    .limit(1);

  return user;
};

const updateResetForgotPassword = async (userId, newPassword) => {
  const [updatedUser] = await db
    .update(userTable)
    .set({
      password: newPassword,
      forgotPasswordToken: null,
      forgotPasswordExpiry: null,
    })
    .where(eq(userTable.id, userId))
    .returning();

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
  getUserById,
  getUserByIdAndUpdate,
  updateEmailVerificationToken,
  addForgotPasswordAndExpiryToken,
  getResetForgotPassword,
  updateResetForgotPassword,
};
