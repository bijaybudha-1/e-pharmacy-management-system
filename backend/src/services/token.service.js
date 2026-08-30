import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20min

  return { unHashedToken, hashedToken, tokenExpiry };
};

const getHashedToken = (verificationToken) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return hashedToken;
};

const generateAccessToken = (payload) => {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRY) {
    throw new ApiError(
      500,
      "ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is missing or not configured",
    );
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId) => {
  if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRY) {
    throw new ApiError(
      500,
      "REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is missing or not configured",
    );
  }

  return jwt.sign(
    {
      id: userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

const decodedJwtToken = (incomingRefreshToken) => {
  return jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
};
export {
  generateTemporaryToken,
  getHashedToken,
  generateAccessToken,
  generateRefreshToken,
  decodedJwtToken,
};
