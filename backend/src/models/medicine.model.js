import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import categoriesTable from "./categories.model.js";
import {
  AvailableMedicineStatus,
  MedicineStatusEnum,
} from "../utils/constants.js";

export const medicineStatusEnum = pgEnum(
  "medicine_status",
  AvailableMedicineStatus,
);

const medicineTable = pgTable("medicines", {
  medicineId: uuid("medicine_id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categoriesTable.categoryId)
    .notNull(),
  medicineName: varchar("medicine_name", { length: 255 }).notNull(),
  genericName: varchar("generic_name", { length: 150 }),
  description: text(),
  form: varchar({ length: 30 }),
  manufacturer: varchar({ length: 150 }),
  requiresPrescription: boolean("requires_prescription")
    .notNull()
    .default(false),
  minStock: integer("min_stock").notNull().default(0),
  sellingPrice: numeric("selling_price", { precision: 10, scale: 2 }),
  discountPrice: numeric("discount_price", { precision: 10, scale: 2 }),
  status: medicineStatusEnum("medicine_status")
    .notNull()
    .default(MedicineStatusEnum.ACTIVE),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export default medicineTable;
