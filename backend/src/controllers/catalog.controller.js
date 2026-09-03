import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { listCategories } from "../services/catalog.service.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await listCategories();

  if (!categories || categories.length === 0) {
    throw new ApiError(404, "No categories found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Category fetched successfully"));
});

export { getAllCategories };
