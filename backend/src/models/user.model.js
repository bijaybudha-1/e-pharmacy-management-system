import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import roleTable from "./role.model.js";

const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 55 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  phone: varchar("phone_number", { length: 20 }),
  password: text().notNull(),
  roleId: uuid("user_id")
    .references(() => roleTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default userTable;
