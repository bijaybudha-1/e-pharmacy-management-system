import Router from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  getOwnPrescription,
  getPrescription,
  uploadPrescription,
} from "../controllers/prescription.controller.js";
import { uploadPrescriptionRequestBodySchema } from "../validators/prescriptions.validation.js";

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
  .route("/:prescriptionId")
  .get(
    authMiddleware,
    authorizeRole(["customer", "admin", "pharmacist"]),
    getPrescription,
  );

export default router;
