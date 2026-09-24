import crypto from "crypto";
import Delivery from "../models/Delivery.js";
import Donation from "../models/Donation.js";
import User from "../models/User.js";
import { calculateRoute } from "../services/routingService.js";

export const assignDriver = async (
  req,
  res
) => {
  try {
    const donation =
      await Donation.findById(
        req.params.donationId
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    const driver = await User.findOne({
      _id: req.body.driverId,
      role: "driver",
      driverStatus: "available",
      isActive: true,
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Available driver not found",
      });
    }

    if (
      driver.vehicleCapacity <
      donation.quantity
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Driver vehicle capacity is insufficient",
      });
    }

    const route = await calculateRoute(
      donation.pickupLocation.coordinates,
      donation.matchedNgo
        ? (
            await User.findById(
              donation.matchedNgo
            )
          ).location.coordinates
        : [0, 0]
    );

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const delivery =
      await Delivery.create({
        donation: donation._id,
        donor: donation.donor,
        ngo: donation.matchedNgo,
        driver: driver._id,
        route,
        expectedQuantity:
          donation.quantity,
        deliveryOtp: otp,
      });

    donation.assignedDriver =
      driver._id;
    donation.status =
      "driver_assigned";

    await donation.save();

    driver.driverStatus = "busy";
    await driver.save();

    res.status(201).json({
      success: true,
      delivery: {
        ...delivery.toObject(),
        deliveryOtp:
          process.env.NODE_ENV === "production"
            ? undefined
            : otp,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const pickupDonation = async (
  req,
  res
) => {
  try {
    const delivery =
      await Delivery.findOne({
        _id: req.params.id,
        driver: req.user._id,
      });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    delivery.status = "picked_up";
    delivery.pickupAt = new Date();

    if (req.body.proofOfPickup) {
      delivery.proofOfPickup =
        req.body.proofOfPickup;
    }

    await delivery.save();

    await Donation.findByIdAndUpdate(
      delivery.donation,
      {
        status: "in_transit",
        pickedUpAt: new Date(),
      }
    );

    res.json({
      success: true,
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyDelivery = async (
  req,
  res
) => {
  try {
    const {
      otp,
      deliveredQuantity,
      proofOfDelivery,
    } = req.body;

    const delivery =
      await Delivery.findOne({
        _id: req.params.id,
        ngo: req.user._id,
      });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    if (
      delivery.deliveryOtp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery OTP",
      });
    }

    delivery.deliveredQuantity =
      Number(deliveredQuantity);

    delivery.proofOfDelivery =
      proofOfDelivery;

    delivery.otpVerified = true;
    delivery.status = "verified";
    delivery.deliveryAt = new Date();

    await delivery.save();

    await Donation.findByIdAndUpdate(
      delivery.donation,
      {
        status: "verified",
        deliveredAt: new Date(),
        verifiedAt: new Date(),
        receivedQuantity:
          Number(deliveredQuantity),
      }
    );

    await User.findByIdAndUpdate(
      delivery.driver,
      {
        driverStatus: "available",
      }
    );

    res.json({
      success: true,
      message:
        "Delivery verified successfully",
      delivery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
