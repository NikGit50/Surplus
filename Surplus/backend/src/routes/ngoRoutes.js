import express from "express";
import {
  getNgoProfile,
  updateNgoProfile,
  getIncomingMatches,
  acceptMatch,
  rejectMatch,
} from "../controllers/ngoController.js";
import {
  protect,
  authorize,
} from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/profile",
  protect,
  authorize("ngo"),
  getNgoProfile
);

router.put(
  "/profile",
  protect,
  authorize("ngo"),
  updateNgoProfile
);

router.get(
  "/matches",
  protect,
  authorize("ngo"),
  getIncomingMatches
);

router.put(
  "/matches/:id/accept",
  protect,
  authorize("ngo"),
  acceptMatch
);

router.put(
  "/matches/:id/reject",
  protect,
  authorize("ngo"),
  rejectMatch
);

export default router;
