import Donation from "../models/Donation.js";
import { calculateUrgency } from "../services/urgencyService.js";
import {
  findMatchesForDonation,
} from "../services/matchingService.js";

export const createDonation = async (req, res) => {
  try {
    const {
      foodName,
      category,
      description,
      quantity,
      unit,
      preparationTime,
      availableFrom,
      deadline,
      foodCondition,
      packagingCondition,
      dietaryType,
      allergens,
      storageCondition,
      temperature,
      specialInstructions,
      imageUrl,
      pickupAddress,
      pickupCoordinates,
    } = req.body;

    if (
      !foodName ||
      !category ||
      !quantity ||
      !availableFrom ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Food name, category, quantity, availability and deadline are required",
      });
    }

    const urgency = calculateUrgency(new Date(deadline));

    const donation = await Donation.create({
      donor: req.user._id,
      foodName,
      category,
      description,
      quantity,
      unit,
      preparationTime,
      availableFrom,
      deadline,
      foodCondition,
      packagingCondition,
      dietaryType,
      allergens,
      storageCondition,
      temperature,
      specialInstructions,
      imageUrl,
      pickupLocation: {
        address: pickupAddress,
        coordinates: pickupCoordinates || [0, 0],
      },
      urgency: urgency.level,
      urgencyScore: urgency.score,
    });

    const matches = await findMatchesForDonation(donation._id);

    res.status(201).json({
      success: true,
      donation,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user._id,
    })
      .populate("matchedNgo", "name organizationName address")
      .populate("assignedDriver", "name phone vehicleType")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name organizationName phone address")
      .populate("matchedNgo", "name organizationName phone address")
      .populate("assignedDriver", "name phone vehicleType");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
