import express from "express";
import {
  assignDriver,
  pickupDonation,
  verifyDelivery,
} from "../controllers/deliveryController.js";
import {
  protect,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/assign/:donationId",
  protect,
  authorize("admin"),
  assignDriver
);

router.put(
  "/:id/pickup",
  protect,
  authorize("driver"),
  pickupDonation
);

router.put(
  "/:id/verify",
  protect,
  authorize("ngo"),
  verifyDelivery
);

export default router;
