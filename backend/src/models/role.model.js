import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const roleTable = pgTable("roles", {
  id: uuid().primaryKey().defaultRandom(),
  roleName: varchar("role_name", { length: 20 }),
  status: varchar({ length: 10 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default roleTable;
