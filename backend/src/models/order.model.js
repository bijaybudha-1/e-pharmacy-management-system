import {
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import customersTable from "./customer.model.js";
import addressesTable from "./address.model.js";
import prescriptionTable from "./prescription.model.js";
import {
  AvailableOrderStatus,
  AvailablePaymentStatusEnum,
  PaymentStatusEnum,
  OrderStatusEnum,
  AvailablePaymentMethodEnum,
  PaymentMethodEnum,
} from "../utils/constants.js";

export const orderStatusEnum = pgEnum("order_status", AvailableOrderStatus);
export const paymentStatusEnum = pgEnum(
  "payment_status",
  AvailablePaymentStatusEnum,
);
export const paymentMethodEnum = pgEnum(
  "payment_method",
  AvailablePaymentMethodEnum,
);

const ordersTable = pgTable("orders", {
  orderId: uuid("order_id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customersTable.customerId),
  addressId: uuid("address_id")
    .notNull()
    .references(() => addressesTable.addressId),
  prescriptionId: uuid("prescription_id").references(
    () => prescriptionTable.prescriptionId,
  ),
  orderDate: timestamp("oder_date").defaultNow().notNull(),
  orderStatus: orderStatusEnum("order_status")
    .notNull()
    .default(OrderStatusEnum.PENDING),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 })
    .default(0)
    .notNull(),
  paymentMethod: paymentMethodEnum("payment_method")
    .notNull()
    .default(PaymentMethodEnum.CASH_ON_DELIVERY),
  paymentStatus: paymentStatusEnum("payment_status")
    .notNull()
    .default(PaymentStatusEnum.PENDING),
  remark: varchar({ length: 255 }),
});

export default ordersTable;
