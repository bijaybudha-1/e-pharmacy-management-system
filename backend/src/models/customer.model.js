import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import userTable from "./user.model.js";
import addressTable from "./address.model.js";

const customersTable = pgTable("customers", {
  customerId: uuid("customer_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => userTable.userId)
    .notNull(),
  defaultAddressId: uuid().references(() => addressTable.addressId),
  loyaltyPoints: numeric("loyalty_points").notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default customersTable;
