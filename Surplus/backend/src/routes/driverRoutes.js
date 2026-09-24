import express from "express";
import {
  updateDriverProfile,
  getDriverJobs,
  acceptJob,
} from "../controllers/driverController.js";
import {
  protect,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();

router.put(
  "/profile",
  protect,
  authorize("driver"),
  updateDriverProfile
);

router.get(
  "/jobs",
  protect,
  authorize("driver"),
  getDriverJobs
);

router.put(
  "/jobs/:id/accept",
  protect,
  authorize("driver"),
  acceptJob
);

export default router;

