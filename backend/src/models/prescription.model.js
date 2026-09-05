import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import customersTable from "../models/customer.model.js";
import {
  PrescriptionStatusEnum,
  AvailablePrescriptionStatus,
} from "../utils/constants.js";

export const prescriptionStatusEnum = pgEnum(
  "prescription_status",
  AvailablePrescriptionStatus,
);

const prescriptionTable = pgTable("prescriptions", {
  prescriptionId: uuid("prescription_id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .references(() => customersTable.customerId)
    .notNull(),
  prescriptionImage: varchar("prescription_image", { length: 255 }).notNull(),
  notes: varchar({ length: 255 }),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  status: prescriptionStatusEnum("prescription_status")
    .notNull()
    .default(PrescriptionStatusEnum.PENDING_REVIEW),
});

export default prescriptionTable;
