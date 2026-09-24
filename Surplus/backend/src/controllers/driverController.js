import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Delivery from "../models/Delivery.js";

export const updateDriverProfile = async (
  req,
  res
) => {
  try {
    const updates = {};

    const fields = [
      "name",
      "phone",
      "vehicleType",
      "vehicleCapacity",
      "driverStatus",
      "address",
    ];

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

    const driver =
      await User.findByIdAndUpdate(
        req.user._id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      );

    res.json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDriverJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Delivery.find({
      driver: req.user._id,
    })
      .populate(
        "donation",
        "foodName category quantity unit deadline pickupLocation"
      )
      .populate(
        "donor",
        "name organizationName phone address"
      )
      .populate(
        "ngo",
        "name organizationName phone address location"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptJob = async (
  req,
  res
) => {
  try {
    const delivery =
      await Delivery.findOneAndUpdate(
        {
          _id: req.params.id,
          driver: req.user._id,
          status: "assigned",
        },
        {
          status: "accepted",
        },
        { new: true }
      );

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        driverStatus: "busy",
      }
    );

    await Donation.findByIdAndUpdate(
      delivery.donation,
      {
        status: "driver_en_route",
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
