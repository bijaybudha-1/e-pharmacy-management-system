import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { categoriesTable, medicineTable } from "../models/index.js";
import { ApiError } from "../utils/apiError.js";

const listCategories = async () => {
  return await db.select().from(categoriesTable);
};

const getCategoryByName = async (categoryName) => {
  const [category] = await db
    .select({
      categoryName: categoriesTable.categoryName,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.categoryName, categoryName))
    .limit(1);

  return category;
};

const insertCategory = async (categoryName, description, categoryStatus) => {
  const [category] = await db
    .insert(categoriesTable)
    .values({
      categoryName,
      description,
      categoryStatus,
    })
    .returning();

  return category;
};

const getByCategoryIdAndUpdate = async (
  categoryId,
  categoryName,
  description,
  categoryStatus,
) => {
  const [category] = await db
    .update(categoriesTable)
    .set({
      categoryName,
      description,
      categoryStatus,
    })
    .where(eq(categoriesTable.categoryId, categoryId))
    .returning({ categoryId: categoriesTable.categoryId });

  return category;
};

const getByCategoryIdAndDelete = async (categoryId) => {
  const [category] = await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.categoryId, categoryId))
    .returning({ categoryId: categoriesTable.categoryId });

  return category;
};

const listMedicine = async () => {
  const medicine = await db.select().from(medicineTable);
  return medicine;
};

const insertMedicine = async (
  categoryName,
  medicineName,
  genericName,
  description,
  form,
  manufacturer,
  requiresPrescription,
  minStock,
  sellingPrice,
  discountPrice,
  status,
) => {
  const [category] = await db
    .select({
      categoryId: categoriesTable.categoryId,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.categoryName, categoryName))
    .limit(1);

  const categoryId = category.categoryId;

  const [medicine] = await db
    .insert(medicineTable)
    .values({
      categoryId,
      medicineName,
      genericName,
      description,
      form,
      manufacturer,
      requiresPrescription,
      minStock,
      sellingPrice,
      discountPrice,
      status,
    })
    .returning();

  return medicine;
};

const getMedicineById = async (medicineId) => {
  const [medicine] = await db
    .select()
    .from(medicineTable)
    .where(eq(medicineTable.medicineId, medicineId))
    .limit(1);

  return medicine;
};

const getByMedicineIdAndUpdate = async (
  medicineId,
  medicineName,
  genericName,
  description,
  form,
  manufacturer,
  requiresPrescription,
  minStock,
  sellingPrice,
  discountPrice,
  status,
) => {
  const [medicine] = await db
    .update(medicineTable)
    .set({
      medicineName,
      genericName,
      description,
      form,
      manufacturer,
      requiresPrescription,
      minStock,
      sellingPrice,
      discountPrice,
      status,
    })
    .where(eq(medicineTable.medicineId, medicineId))
    .returning();

  return medicine;
};

export {
  listCategories,
  getCategoryByName,
  insertCategory,
  getByCategoryIdAndUpdate,
  getByCategoryIdAndDelete,
  listMedicine,
  insertMedicine,
  getMedicineById,
  getByMedicineIdAndUpdate,
};
