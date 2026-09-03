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

const setDefaultAddress = async (addressId, userId) => {
  return await db.transaction(async (tx) => {
    const [customer] = await tx
      .select({
        customerId: customersTable.customerId,
      })
      .from(customersTable)
      .where(eq(customersTable.userId, userId))
      .limit(1);

    if (!customer) {
      throw new ApiError(404, "Customer id is missing or invalid");
    }

    const [address] = await tx
      .select({
        addressId: addressesTable.addressId,
        isDefault: addressesTable.isDefault,
      })
      .from(addressesTable)
      .where(
        and(
          eq(addressesTable.addressId, addressId),
          eq(addressesTable.customerId, customer.customerId),
        ),
      )
      .limit(1);

    if (!address) {
      throw new ApiError(404, "Address id is missing or invalid");
    }

    await tx
      .update(addressesTable)
      .set({ isDefault: false })
      .where(eq(addressesTable.customerId, customer.customerId));

    const [updatedAddress] = await tx
      .update(addressesTable)
      .set({ isDefault: true })
      .where(
        and(
          eq(addressesTable.customerId, customer.customerId),
          eq(addressesTable.addressId, addressId),
        ),
      )
      .returning();

    await tx
      .update(customersTable)
      .set({ defaultAddressId: addressId })
      .where(eq(customersTable.customerId, customer.customerId));

    return updatedAddress;
  });
};

export {
  getAddressByUserId,
  createAddress,
  getAddressByIdAndUpdate,
  deleteAddressById,
  setDefaultAddress,
};
