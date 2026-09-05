import { string, z } from "zod/v4";
import { StatusEnum, MedicineStatusEnum } from "../utils/constants.js";

const createCategoryRequestBodySchema = z.object({
  categoryName: z.string().min(5, "Category name must be at least 5 character"),
  description: z
    .string()
    .min(5, "Category name must be at least 5 character")
    .optional(),
  categoryStatus: z
    .enum(StatusEnum.ACTIVE, StatusEnum.INACTIVE, StatusEnum.SUSPENDED)
    .default(StatusEnum.ACTIVE),
});

const updateCategoryRequestBodySchema = z.object({
  categoryName: z.string().min(5, "Category name must be at least 5 character"),
  description: z
    .string()
    .min(5, "Category name must be at least 5 character")
    .optional(),
  categoryStatus: z
    .enum(StatusEnum.ACTIVE, StatusEnum.INACTIVE, StatusEnum.SUSPENDED)
    .default(StatusEnum.ACTIVE),
});

const createMedicineRequestBodySchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(5, "Medicine name must be at least 4 character")
    .max(100, "Medicine name must not exceed 100 characters"),
  medicineName: z
    .string()
    .trim()
    .min(5, "Medicine name must be at least 4 character")
    .max(150, "Medicine name must not exceed 150 characters"),
  genericName: z
    .string()
    .trim()
    .min(3, "Generic name must be at least 4 character")
    .max(150, "Generic name must not exceed 150 characters")
    .optional(),
  description: z
    .string()
    .trim()
    .min("10", "Description at least 10 character")
    .optional(),
  form: z
    .string()
    .trim()
    .min("3", "Description at least 3 character")
    .max(30, "form must not exceed 150 characters")
    .optional(),
  manufacturer: z
    .string()
    .trim()
    .min("5", "Description at least 5 character")
    .max(100, "manufacturer name must not exceed 150 characters")
    .optional(),
  requiresPrescription: z
    .boolean({ error: "Requires prescription must be a boolean" })
    .default(false),
  minStock: z
    .number({ error: "Minimum stock must be a number" })
    .int("Minimum stock must be an integer")
    .min(0, "Minimum stock cannot be negative"),
  sellingPrice: z
    .number({ error: "Selling price must be a number" })
    .positive("Selling Price must be greater than 0"),
  discountPrice: z
    .number({ error: "Discount price must be a number" })
    .positive("Discount Price must be greater than 0")
    .optional(),
  status: z
    .enum([
      MedicineStatusEnum.ACTIVE,
      MedicineStatusEnum.INACTIVE,
      MedicineStatusEnum.DISCONTINUED,
    ])
    .default(MedicineStatusEnum.ACTIVE),
});

const updateMedicineRequestBodySchema = z.object({
  medicineName: z
    .string()
    .trim()
    .min(5, "Medicine name must be at least 4 character")
    .max(150, "Medicine name must not exceed 150 characters")
    .optional(),
  genericName: z
    .string()
    .trim()
    .min(3, "Generic name must be at least 4 character")
    .max(150, "Generic name must not exceed 150 characters")
    .optional(),
  description: z
    .string()
    .trim()
    .min("10", "Description at least 10 character")
    .optional(),
  form: z
    .string()
    .trim()
    .min("3", "Description at least 3 character")
    .max(30, "form must not exceed 150 characters")
    .optional(),
  manufacturer: z
    .string()
    .trim()
    .min("5", "Description at least 5 character")
    .max(100, "manufacturer name must not exceed 150 characters")
    .optional(),
  requiresPrescription: z
    .boolean({ error: "Requires prescription must be a boolean" })
    .optional(),
  minStock: z
    .number({ error: "Minimum stock must be a number" })
    .int("Minimum stock must be an integer")
    .min(0, "Minimum stock cannot be negative")
    .optional(),
  sellingPrice: z
    .number({ error: "Selling price must be a number" })
    .positive("Selling Price must be greater than 0")
    .optional(),
  discountPrice: z
    .number({ error: "Discount price must be a number" })
    .positive("Discount Price must be greater than 0")
    .optional(),
  status: z
    .enum([
      MedicineStatusEnum.ACTIVE,
      MedicineStatusEnum.INACTIVE,
      MedicineStatusEnum.DISCONTINUED,
    ])
    .optional(),
});

const medicineIdSchema = z.object({
  medicineId: z.string().uuid(),
});

const categoryIdSchema = z.object({
  categoryId: z.string().uuid(),
});

export {
  medicineIdSchema,
  categoryIdSchema,
  createCategoryRequestBodySchema,
  updateCategoryRequestBodySchema,
  createMedicineRequestBodySchema,
  updateMedicineRequestBodySchema,
};
