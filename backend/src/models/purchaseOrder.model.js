import { numeric, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import suppliersTable from "./supplier.model.js";
import {
  PurchaseOrderStatusEnum,
  AvailablePurchaseStatus,
} from "../utils/constants.js";
import userTable from "./user.model.js";

export const purchaseOrderEnum = pgEnum(
  "purchase_status",
  AvailablePurchaseStatus,
);

const purchaseOrdersTable = pgTable("purchase_orders", {
  purchaseId: uuid("purchase_id").primaryKey().defaultRandom(),
  supplierId: uuid("supplier_id").references(() => suppliersTable.supplierId),
  orderDate: timestamp("order_date").defaultNow().notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: purchaseOrderEnum("purchase_order")
    .default(PurchaseOrderStatusEnum.PENDING)
    .notNull(),
  createdBy: uuid("created_by").references(() => userTable.userId),
  createAt: timestamp("created_at").defaultNow().notNull(),
});

export default purchaseOrdersTable;
