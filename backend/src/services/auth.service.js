import { eq } from "drizzle-orm";
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
    .returning({ userId: userTable.id });

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

export {
  getUserByEmail,
  createUser,
  getHashedPassword,
  getDefaultRoleId,
  comparePassword,
};
