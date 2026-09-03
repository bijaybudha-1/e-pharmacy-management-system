import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createAddress,
  getAddressByUserId,
} from "../services/address.service.js";

const getOwnAddress = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: user authentication required");
  }

  const address = await getAddressByUserId(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: address }, "Address fetched successfully"),
    );
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const {
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
  } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: user authentication required");
  }

  console.log("country:", country);
  console.log("body:", req.body);
  const address = await createAddress(
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
  );
  return res
    .status(201)
    .json(new ApiResponse(201, address, "Address added successfully"));
});

export { getOwnAddress, addAddress };
