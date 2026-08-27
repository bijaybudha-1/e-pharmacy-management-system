import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {
  AvailableUserRole,
  AvailableUserStatus,
  UserRoleEnum,
  UserStatusEnum,
} from "../utils/constants.js";

export const userRoleEnum = pgEnum("role_name", AvailableUserRole);
export const userStatusEnum = pgEnum("user_status", AvailableUserStatus);

const roleTable = pgTable("roles", {
  id: uuid().primaryKey().defaultRandom(),
  roleName: userRoleEnum("role_name").notNull().default(UserRoleEnum.CUSTOMER),
  status: userStatusEnum("user_status")
    .notNull()
    .default(UserStatusEnum.ACTIVE),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default roleTable;
