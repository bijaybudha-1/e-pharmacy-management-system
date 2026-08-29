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
import { UserStatusEnum, AvailableUserStatus } from "../utils/constants.js";

export const userStatusEnum = pgEnum("user_status", AvailableUserStatus);

const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 55 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  phone: varchar("phone_number", { length: 20 }),
  password: text().notNull(),
  roleId: uuid("role_id")
    .references(() => roleTable.id)
    .notNull(),
  status: userStatusEnum("user_status")
    .notNull()
    .default(UserStatusEnum.ACTIVE),
  refreshToken: varchar("refresh_token", { length: 255 }),
  emailVerified: boolean("email_verified").notNull().default(false),
  emailValidationToken: text("email_validation_token"),
  emailValidationTokenExpiry: timestamp("email_validation_token_Expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default userTable;
