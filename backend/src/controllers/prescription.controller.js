import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  getPendingPrescription,
  getPrescriptionByCustomerId,
  getPrescriptionById,
  insertPrescription,
} from "../services/prescription.service.js";
import { prescriptionIdSchema } from "../validators/prescriptions.validation.js";

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

const getOwnPrescription = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(400, "UserId is missing or invalid");
  }

  const prescription = await getPrescriptionByCustomerId(userId);

  if (!prescription) {
    throw new ApiError(404, "prescription not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        prescription,
        "customer prescription fetched successfully",
      ),
    );
});

const getPrescription = asyncHandler(async (req, res) => {
  const { prescriptionId } = req.params;
  const result = prescriptionIdSchema.safeParse({ prescriptionId });

  if (!result.success) {
    throw new ApiError(400, "prescriptionId is missing or invalid");
  }

  const prescription = await getPrescriptionById(prescriptionId);

  if (!prescription) {
    throw new ApiError(404, "Prescription not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, prescription, "Prescription fetched successfully"),
    );
});

const pendingPrescription = asyncHandler(async (req, res) => {
  const prescription = await getPendingPrescription();

  if (!prescription) {
    throw new ApiError(404, "pending_review prescription not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        prescription,
        "pending prescription fetched successfully ",
      ),
    );
});

export {
  uploadPrescription,
  getOwnPrescription,
  getPrescription,
  pendingPrescription,
};
