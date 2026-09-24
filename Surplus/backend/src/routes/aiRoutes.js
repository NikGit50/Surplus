import express from "express";
import {
  extractDonation,
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/extract-donation",
  protect,
  extractDonation
);

export default router;
