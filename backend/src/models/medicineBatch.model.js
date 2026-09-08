import {
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import medicineTable from "../models/medicine.model.js";
import {
  MedicineBatchStatusEnum,
  AvailableMedicineBatchStatusEnum,
} from "../utils/constants.js";

export const medicineBatchStatusEnum = pgEnum(
  "medicine_batch",
  AvailableMedicineBatchStatusEnum,
);

const medicineBatchTable = pgTable("medicineBatchTable", {
  batchId: uuid("batch_id").primaryKey().defaultRandom(),
  medicineId: uuid("medicine_id")
    .notNull()
    .references(() => medicineTable.medicineId),
  batchNo: varchar("batch_no", { length: 100 }).notNull().unique(),
  manufactureDate: timestamp("manufacture_date"),
  expiryDate: timestamp("expiry_date").notNull(),
  purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 })
    .notNull()
    .default(0),
  currentStock: numeric("current_stock").notNull().default(0),
  status: medicineBatchStatusEnum("medicine_batch_enum")
    .notNull()
    .default(MedicineBatchStatusEnum.ACTIVE),
  createdAt: timestamp("create_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default medicineBatchTable;
