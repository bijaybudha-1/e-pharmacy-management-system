import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import {
  AvailableUserRole,
  AvailableStatus,
  UserRoleEnum,
  StatusEnum,
} from "../utils/constants.js";

export const userRoleEnum = pgEnum("role_name", AvailableUserRole);
export const userStatusEnum = pgEnum("user_status", AvailableStatus);

const roleTable = pgTable("roles", {
  id: uuid("role_id").primaryKey().defaultRandom(),
  roleName: userRoleEnum("role_name").notNull().default(UserRoleEnum.CUSTOMER),
  status: userStatusEnum("user_status").notNull().default(StatusEnum.ACTIVE),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default roleTable;
