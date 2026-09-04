import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { roleTable } from "../models/index.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authorizeRole = (allowedRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "User is not authenticated");
    }

    const [role] = await db
      .select({
        roleName: roleTable.roleName,
      })
      .from(roleTable)
      .where(eq(roleTable.roleId, req.user.roleId))
      .limit(1);

    if (!role) {
      throw new ApiError(403, "User role not found");
    }

    if (!allowedRoles.includes(role.roleName)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action",
      );
    }

    next();
  });
};
