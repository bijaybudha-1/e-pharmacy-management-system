import { z } from "zod/v4";
import { PrescriptionStatusEnum } from "../utils/constants.js";

const uploadPrescriptionRequestBodySchema = z.object({
  prescriptionImage: z
    .string()
    .min(5, "prescriptionImage must not exceed 255 characters")
    .max(255, "prescriptionImage must not exceed 255 characters"),
  notes: z
    .string()
    .max(255, "Notes must not exceed 255 characters")
    .optional()
    .nullable(),
  status: z
    .enum(
      PrescriptionStatusEnum.UPLOADED,
      PrescriptionStatusEnum.PENDING_REVIEW,
      PrescriptionStatusEnum.UNDER_REVIEW,
      PrescriptionStatusEnum.APPROVED,
      PrescriptionStatusEnum.REJECT,
    )
    .default(PrescriptionStatusEnum.PENDING_REVIEW),
});

export { uploadPrescriptionRequestBodySchema };
