import { ApiResponse } from "../utils/apiResponse.js";

const healthCheck = (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Service is healthy" }));
};

export default healthCheck;
