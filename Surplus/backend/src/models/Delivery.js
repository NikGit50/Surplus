import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      unique: true,
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    route: {
      distance: Number,
      duration: Number,
      geometry: mongoose.Schema.Types.Mixed,
    },

    pickupAt: Date,
    deliveryAt: Date,

    expectedQuantity: Number,
    deliveredQuantity: Number,

    deliveryOtp: String,

    otpVerified: {
      type: Boolean,
      default: false,
    },

    proofOfPickup: String,
    proofOfDelivery: String,

    incident: String,

    status: {
      type: String,
      enum: [
        "assigned",
        "accepted",
        "en_route",
        "picked_up",
        "in_transit",
        "delivered",
        "verified",
        "cancelled",
      ],
      default: "assigned",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Delivery", deliverySchema);
