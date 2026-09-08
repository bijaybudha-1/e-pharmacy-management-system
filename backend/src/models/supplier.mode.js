import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { StatusEnum, AvailableStatus } from "../utils/constants.js";

export const supplierEnumStatus = pgEnum("supplier_status", AvailableStatus);

const suppliersTable = pgTable("suppliers", {
  supplierId: uuid("supplier_id").primaryKey().defaultRandom(),
  supplierName: varchar("supplier_name", { length: 150 }).notNull(),
  contactPerson: varchar("contact_person", { length: 100 }),
  phone: varchar({ length: 20 }),
  email: varchar({ email: 150 }),
  address: varchar({ length: 255 }),
  status: supplierEnumStatus("supplier_status")
    .default(StatusEnum.ACTIVE)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("update_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default suppliersTable;
