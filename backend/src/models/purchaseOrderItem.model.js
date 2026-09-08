import {
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import purchaseOrdersTable from "./purchaseOrder.model.js";
import medicineTable from "./medicine.model.js";

const purchaseOrderItem = pgTable("purchaseOrderItems", {
  poItemId: uuid("po_item_id").primaryKey().defaultRandom(),
  purchaseId: uuid("purchase_id").references(
    () => purchaseOrdersTable.purchaseId,
  ),
  medicineId: uuid("medicine_id").references(() => medicineTable.medicineId),
  batchNo: varchar("batch_no", { length: 50 }).notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
  quantity: numeric().notNull(),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
});

export default purchaseOrderItem;
