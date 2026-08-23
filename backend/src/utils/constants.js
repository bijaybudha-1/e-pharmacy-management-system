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

export const AvailableUserRole = Object.values(UserRoleEnum);
export const AvailablePrescriptionStatus = Object(PrescriptionStatusEnum);
