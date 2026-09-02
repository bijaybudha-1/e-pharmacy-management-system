import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAddressByUserId } from "../services/address.service.js";

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

export { getOwnAddress };
