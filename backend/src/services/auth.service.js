import { and, eq, gt } from "drizzle-orm";
import db from "../db/index.js";
import { userTable, roleTable, customersTable } from "../models/index.js";
import bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  return user;
};

const getDefaultRole = async () => {
  const [role] = await db
    .select({
      roleId: roleTable.roleId,
    })
    .from(roleTable)
    .where(eq(roleTable.roleName, "customer"))
    .limit(1);

  return role;
};

const getHashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const createUser = async (
  email,
  fullName,
  password,
  roleId,
  emailVerificationToken,
  emailVerificationTokenExpiry,
) => {
  const user = await db.transaction(async (tx) => {
    const [insertUser] = await tx
      .insert(userTable)
      .values({
        email,
        fullName,
        password,
        roleId,
        emailVerificationToken,
        emailVerificationTokenExpiry,
      })
      .returning({
        userId: userTable.userId,
        fullName: userTable.fullName,
        email: userTable.email,
      });

    await tx.insert(customersTable).values({
      userId: insertUser.userId,
      loyaltyPoints: 0,
    });

    return insertUser;
  });
  return user;
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
    .where(eq(userTable.userId, userId))
    .returning();

  return emailVerified;
};

const getUserById = async (userId) => {
  const [user] = await db
    .select({
      id: userTable.userId,
      fullName: userTable.fullName,
      email: userTable.email,
      password: userTable.password,
      emailVerified: userTable.emailVerified,
      refreshToken: userTable.refreshToken,
      roleId: userTable.roleId,
    })
    .from(userTable)
    .where(eq(userTable.userId, userId))
    .limit(1);

  return user;
};

const getUserByIdAndUpdate = async (userId) => {
  const [user] = await db
    .update(userTable)
    .set({
      refreshToken: null,
    })
    .where(eq(userTable.userId, userId))
    .returning();

  return user;
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
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
    .where(eq(userTable.userId, userId))
    .returning();

  return user;
};

const updateRefreshToken = async (userId, refreshToken) => {
  const updatedUser = await db
    .update(userTable)
    .set({
      refreshToken: refreshToken,
    })
    .where(eq(userTable.userId, userId))
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
    .where(eq(userTable.userId, userId))
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
    .where(eq(userTable.userId, userId))
    .returning();

  return updatedUser;
};

const updatePassword = async (userId, password) => {
  const [user] = await db
    .update(userTable)
    .set({ password })
    .where(eq(userTable.userId, userId))
    .returning();

  return user;
};

export {
  getUserByEmail,
  createUser,
  getHashedPassword,
  getDefaultRole,
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
  updatePassword,
};
