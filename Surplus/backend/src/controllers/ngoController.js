import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Match from "../models/Match.js";

export const getNgoProfile = async (req, res) => {
  res.json({
    success: true,
    ngo: req.user,
  });
};

export const updateNgoProfile = async (req, res) => {
  try {
    const fields = [
      "organizationName",
      "address",
      "maximumCapacity",
      "currentStock",
      "beneficiaries",
      "requiredCategories",
      "dietaryPreferences",
      "minimumQuantity",
      "maximumAcceptableQuantity",
    ];

    const updates = {};

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (req.body.location) {
      updates.location = {
        type: "Point",
        coordinates: req.body.location,
      };
    }

    const ngo = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      ngo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncomingMatches = async (
  req,
  res
) => {
  try {
    const matches = await Match.find({
      ngo: req.user._id,
      status: "pending",
    })
      .populate("donation")
      .sort({ totalScore: -1 });

    res.json({
      success: true,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptMatch = async (req, res) => {
  try {
    const match = await Match.findOne({
      _id: req.params.id,
      ngo: req.user._id,
      status: "pending",
    }).populate("donation");

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    match.status = "accepted";
    await match.save();

    await Donation.findByIdAndUpdate(
      match.donation._id,
      {
        matchedNgo: req.user._id,
        status: "matched",
      }
    );

    await Match.updateMany(
      {
        donation: match.donation._id,
        _id: { $ne: match._id },
        status: "pending",
      },
      {
        status: "rejected",
      }
    );

    res.json({
      success: true,
      message: "Donation accepted",
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectMatch = async (req, res) => {
  try {
    const match = await Match.findOneAndUpdate(
      {
        _id: req.params.id,
        ngo: req.user._id,
        status: "pending",
      },
      {
        status: "rejected",
      },
      { new: true }
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    res.json({
      success: true,
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
