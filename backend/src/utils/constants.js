export const UserRoleEnum = {
  ADMIN: "admin",
  PHARMACIST: "pharmacist",
  INVENTORY_MANAGER: "inventory_manager",
  DELIVERY_STAFF: "delivery_staff",
  CUSTOMER: "customer",
};

export const PrescriptionStatusEnum = {
  UPLOADED: "uploaded",
  PENDING_REVIEW: "pending_review",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECT: "reject",
};

export const StatusEnum = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
};

export const MedicineStatusEnum = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DISCONTINUED: "Discontinued",
};

export const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

export const OrderStatusEnum = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PACKED: "packed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

export const PaymentStatusEnum = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const PaymentMethodEnum = {
  CASH_ON_DELIVERY: "cash_on_delivery",
  KhALTI: "khalti",
  ESEWA: "esewa",
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
};

export const MedicineBatchStatusEnum = {
  ACTIVE: "active",
  EXPIRED: "expired",
  DEPLETED: "depleted",
};

export const PurchaseOrderStatusEnum = {
  PENDING: "pending",
  RECEIVED: "received",
  CANCELED: "canceled",
};

export const StockTransactionTypeEnum = {
  IN: "in",
  OUT: "out",
  ADJUST: "adjust",
};

export const StockReferenceTypeEnum = {
  PURCHASE: "purchase",
  ORDER: "order",
  RETURN: "return",
  ADJUST: "adjust",
};

export const AvailableUserRole = Object.values(UserRoleEnum);
export const AvailablePrescriptionStatus = Object.values(
  PrescriptionStatusEnum,
);
export const AvailableStatus = Object.values(StatusEnum);
export const AvailableMedicineStatus = Object.values(MedicineStatusEnum);
export const AvailableGender = Object.values(GenderEnum);
export const AvailableOrderStatus = Object.values(OrderStatusEnum);
export const AvailablePaymentStatusEnum = Object.values(PaymentStatusEnum);
export const AvailablePaymentMethodEnum = Object.values(PaymentMethodEnum);
export const AvailableMedicineBatchStatusEnum = Object.values(
  MedicineBatchStatusEnum,
);
export const AvailablePurchaseStatus = Object.values(PurchaseOrderStatusEnum);
export const AvailableStockTransactionType = Object.values(
  StockTransactionTypeEnum,
);
export const AvailableStockReferenceType = Object.values(StockReferenceTypeEnum);
