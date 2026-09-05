import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { insertPrescription } from "../services/prescription.service.js";

const uploadPrescription = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { prescriptionImage, notes, status } = req.body;

  if (!userId) {
    throw new ApiError(400, "userId is missing or invalid");
  }

  const prescription = await insertPrescription(
    userId,
    prescriptionImage,
    notes,
    status,
  );

  if (!prescription) {
    throw new ApiError(409, "Failed to upload prescription image");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        prescription,
        "Upload prescription image upload successfully",
      ),
    );
});

export { uploadPrescription };
