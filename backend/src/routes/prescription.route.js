import Router from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  getOwnPrescription,
  getPrescription,
  pendingPrescription,
  uploadPrescription,
  verifyPrescription,
} from "../controllers/prescription.controller.js";
import {
  uploadPrescriptionRequestBodySchema,
  verifyPrescriptionRequestBodySchema,
} from "../validators/prescriptions.validation.js";

const router = Router();

// Protected Customer Route
router
  .route("/")
  .post(
    authMiddleware,
    authorizeRole(["customer"]),
    validate(uploadPrescriptionRequestBodySchema),
    uploadPrescription,
  );

router
  .route("/")
  .get(authMiddleware, authorizeRole(["customer"]), getOwnPrescription);

// Protected Customer, Admin, Pharmacist, and Customer
router
  .route("/pending")
  .get(authMiddleware, authorizeRole(["pharmacist"]), pendingPrescription);

router
  .route("/:prescriptionId")
  .get(
    authMiddleware,
    authorizeRole(["customer", "admin", "pharmacist"]),
    getPrescription,
  );

router
  .route("/:prescriptionId/verify")
  .post(
    authMiddleware,
    authorizeRole(["pharmacist"]),
    validate(verifyPrescriptionRequestBodySchema),
    verifyPrescription,
  );

export default router;
