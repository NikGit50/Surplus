import express from "express";
import {
  createDonation,
  getMyDonations,
  getDonationById,
} from "../controllers/donationController.js";
import {
  protect,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("donor"),
  createDonation
);

router.get(
  "/mine",
  protect,
  authorize("donor"),
  getMyDonations
);

router.get(
  "/:id",
  protect,
  getDonationById
);

export default router;
