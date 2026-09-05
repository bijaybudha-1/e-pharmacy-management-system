import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  getByCategoryIdAndDelete,
  getByCategoryIdAndUpdate,
  getCategoryByName,
  getMedicineById,
  insertCategory,
  insertMedicine,
  listCategories,
  listMedicine,
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

  res
    .status(201)
    .json(new ApiResponse(201, categories, "Create a category successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName, description, categoryStatus } = req.body;

  if (!categoryId) {
    throw new ApiError(400, "CategoryId is missing or invalid");
  }

  const category = await getByCategoryIdAndUpdate(
    categoryId,
    categoryName,
    description,
    categoryStatus,
  );

  if (!category) {
    throw new ApiError(404, "CategoryId is doesn't exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category is updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new ApiError(400, "CategoryId is missing or invalid");
  }

  console.log("CategoryID: ", categoryId);

  const category = await getByCategoryIdAndDelete(categoryId);
  console.log("Category: ", category);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category deleted successfully"));
});

const getAllMedicine = asyncHandler(async (req, res) => {
  const medicine = await listMedicine();

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicine, "Medicine fetched successfully"));
});

const createMedicine = asyncHandler(async (req, res) => {
  const {
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
  } = req.body;

  const medicine = await insertMedicine(
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
  );

  if (!medicine) {
    throw new ApiError(409, "Failed to create a medicine");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, medicine, "Create a medicine successfully"));
});

const medicineDetails = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  if (!medicineId) {
    throw new ApiError(400, "Medicine ID is missing or invalid");
  }

  try {
    const medicine = await getMedicineById(medicineId);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          medicine,
          "Medicine details data fetched successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(409, "Medicine Details not found");
  }
});

export {
  getAllCategories,
  createCategories,
  updateCategory,
  deleteCategory,
  getAllMedicine,
  createMedicine,
  medicineDetails,
};
