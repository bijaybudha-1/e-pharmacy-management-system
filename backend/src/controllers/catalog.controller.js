import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  getCategoryByName,
  insertCategory,
  listCategories,
} from "../services/catalog.service.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await listCategories();

  if (!categories || categories.length === 0) {
    throw new ApiError(404, "No categories found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Category fetched successfully"));
});

const createCategories = asyncHandler(async (req, res) => {
  const { categoryName, description, categoryStatus } = req.body;

  const existingCategory = await getCategoryByName(categoryName);

  console.log(existingCategory);

  if (existingCategory) {
    throw new ApiError(409, `${categoryName} category is already exists`);
  }

  const categories = await insertCategory(
    categoryName,
    description,
    categoryStatus,
  );

  if (!categories) {
    throw new ApiError(409, "Failed to create categories");
  }

  res.status(201).json(new ApiResponse(201, "Create a category successfully"));
});

export { getAllCategories, createCategories };
