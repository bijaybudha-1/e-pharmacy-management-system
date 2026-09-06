import { prescriptionTable, customersTable } from "../models/index.js";
import db from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { ApiError } from "../utils/apiError.js";

const insertPrescription = async (userId, prescriptionImage, notes, status) => {
  return await db.transaction(async (tx) => {
    const [customer] = await tx
      .select()
      .from(customersTable)
      .where(eq(customersTable.userId, userId))
      .limit(1);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const [prescription] = await tx
      .insert(prescriptionTable)
      .values({
        customerId: customer.customerId,
        prescriptionImage,
        notes,
        status,
      })
      .returning();

    return prescription;
  });
};

const getPrescriptionByCustomerId = async (userId) => {
  return await db.transaction(async (tx) => {
    const [customer] = await tx
      .select()
      .from(customersTable)
      .where(eq(customersTable.userId, userId))
      .limit(1);

    const prescription = await tx
      .select()
      .from(prescriptionTable)
      .where(eq(prescriptionTable.customerId, customer.customerId));

    return prescription;
  });
};

const getPrescriptionById = async (prescriptionId) => {
  const [prescription] = await db
    .select()
    .from(prescriptionTable)
    .where(eq(prescriptionTable.prescriptionId, prescriptionId))
    .limit(1);

  return prescription;
};

export { insertPrescription, getPrescriptionByCustomerId, getPrescriptionById };
