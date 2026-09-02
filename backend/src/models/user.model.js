import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import roleTable from "./role.model.js";
import { StatusEnum, AvailableStatus } from "../utils/constants.js";

export const userStatusEnum = pgEnum("user_status", AvailableStatus);

const userTable = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar({ length: 150 }).unique().notNull(),
  phone: varchar("phone", { length: 20 }),
  password: text().notNull(),
  roleId: uuid("role_id")
    .references(() => roleTable.roleId)
    .notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  emailVerificationToken: text("email_verification_token"),
  emailVerificationTokenExpiry: timestamp("email_verification_token_Expiry"),
  refreshToken: text("refresh_token"),
  forgotPasswordToken: text("forgot_password_token"),
  forgotPasswordExpiry: timestamp("forgot_password_expiry"),
  status: userStatusEnum("user_status").notNull().default(StatusEnum.INACTIVE),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default userTable;
