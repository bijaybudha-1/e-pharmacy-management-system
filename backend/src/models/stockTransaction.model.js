import { numeric, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import medicineBatchTable from "./medicineBatch.model.js";
import userTable from "./user.model.js";
import {
  StockReferenceTypeEnum,
  StockTransactionTypeEnum,
  AvailableStockReferenceType,
  AvailableStockTransactionType,
} from "../utils/constants.js";

export const stockTxnTypeEnum = pgEnum(
  "txn_type",
  AvailableStockTransactionType,
);
export const stockReferenceTypeEnum = pgEnum(
  "reference_type",
  AvailableStockReferenceType,
);

export const stockTransactionTable = pgTable("stockTransactions", {
  stockTxnId: uuid("stock_txn_Id").primaryKey().defaultRandom(),
  batchId: uuid("batch_id").references(() => medicineBatchTable.batchId),
  txnType: stockTxnTypeEnum("txn_type")
    .default(StockTransactionTypeEnum.IN)
    .notNull(),
  quantity: numeric().notNull(),
  referenceType: stockReferenceTypeEnum("reference_type")
    .default(StockReferenceTypeEnum.ORDER)
    .notNull(),
  referenceId: uuid().unique().defaultRandom().notNull(),
  txnDate: timestamp("txn_date").notNull(),
  createBy: uuid("created_by").references(() => userTable.userId),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export default stockTransactionTable;
