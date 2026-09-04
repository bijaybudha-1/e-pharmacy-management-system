import { string, z } from "zod/v4";
import { StatusEnum } from "../utils/constants.js";

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

export { createCategoryRequestBodySchema };
