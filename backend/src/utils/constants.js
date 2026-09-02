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

export const AvailableUserRole = Object.values(UserRoleEnum);
export const AvailablePrescriptionStatus = Object.values(
  PrescriptionStatusEnum,
);
export const AvailableStatus = Object.values(StatusEnum);
export const AvailableMedicineStatus = Object.values(MedicineStatusEnum);
export const AvailableGender = Object.values(GenderEnum);
