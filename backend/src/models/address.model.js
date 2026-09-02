import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import customersTable from "./customer.model.js";

const addressesTable = pgTable("addresses", {
  addressId: uuid("address_id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").references(() => customersTable.customerId),
  label: varchar(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  addressLine1: varchar("address_line1", { length: 150 }).notNull(),
  addressLine2: varchar("address_line2", { length: 150 }),
  city: varchar({ length: 50 }).notNull(),
  state: varchar({ length: 50 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: varchar({ length: 50 }).notNull(),
  isDefault: boolean("is_default").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default addressesTable;
