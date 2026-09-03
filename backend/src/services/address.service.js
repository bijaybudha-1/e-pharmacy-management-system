import { eq, and } from "drizzle-orm";
import db from "../db/index.js";
import { customersTable, addressesTable } from "../models/index.js";
import { ApiError } from "../utils/apiError.js";

const getAddressByUserId = async (userId) => {
  const [address] = await db
    .select({
      id: addressesTable.addressId,
      label: addressesTable.label,
      fullName: addressesTable.fullName,
      phone: addressesTable.phone,
      addressesLine1: addressesTable.addressLine1,
      addressesLine2: addressesTable.addressLine2,
      city: addressesTable.city,
      state: addressesTable.state,
      postalCode: addressesTable.postalCode,
      country: addressesTable.country,
      isDefault: addressesTable.isDefault,
      createdAt: addressesTable.createdAt,
      updatedAt: addressesTable.updatedAt,
    })
    .from(addressesTable)
    .innerJoin(
      customersTable,
      eq(addressesTable.customerId, customersTable.customerId),
    )
    .where(eq(customersTable.userId, userId));

  return address;
};

const createAddress = async (
  userId,
  label,
  fullName,
  phone,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  isDefault,
) => {
  const [customer] = await db
    .select({
      customerId: customersTable.customerId,
    })
    .from(customersTable)
    .where(eq(customersTable.userId, userId))
    .limit(1);

  if (!customer) {
    throw new ApiError(404, "Customer profile not found");
  }

  const [address] = await db
    .insert(addressesTable)
    .values({
      customerId: customer.customerId,
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    })
    .returning();

  return address;
};

const getAddressByIdAndUpdate = async (
  addressId,
  userId,
  label,
  fullName,
  phone,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
) => {
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.userId, userId))
    .limit(1);

  const [address] = await db
    .update(addressesTable)
    .set({
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    })
    .where(
      and(
        eq(addressesTable.addressId, addressId),
        eq(addressesTable.customerId, customer.customerId),
      ),
    )
    .returning();

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  return address;
};

const deleteAddressById = async (addressId, userId) => {
  const [customer] = await db
    .select({
      customerId: customersTable.customerId,
    })
    .from(customersTable)
    .where(eq(customersTable.userId, userId))
    .limit(1);

  if (!customer) {
    throw new ApiError("404", "Customer ID is invalid or not found");
  }

  const [address] = await db
    .delete(addressesTable)
    .where(
      and(
        eq(addressesTable.addressId, addressId),
        eq(addressesTable.customerId, customer.customerId),
      ),
    )
    .returning();

  if (!address) {
    throw new ApiError("404", "Address ID is invalid or not found");
  }

  return customer;
};

export {
  getAddressByUserId,
  createAddress,
  getAddressByIdAndUpdate,
  deleteAddressById,
};
