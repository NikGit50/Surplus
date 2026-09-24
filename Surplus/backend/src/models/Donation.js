import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      enum: ["kg", "grams", "litres", "units", "packets", "meals"],
      default: "kg",
    },

    preparationTime: Date,

    availableFrom: {
      type: Date,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    foodCondition: String,

    packagingCondition: String,

    dietaryType: {
      type: String,
      enum: ["vegetarian", "non-vegetarian", "vegan", "mixed", "unknown"],
      default: "unknown",
    },

    allergens: {
      type: [String],
      default: [],
    },

    storageCondition: String,

    temperature: Number,

    specialInstructions: String,

    imageUrl: String,

    pickupLocation: {
      address: String,

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },

    urgencyScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "posted",
        "matched",
        "driver_assigned",
        "driver_en_route",
        "picked_up",
        "in_transit",
        "delivered",
        "verified",
        "cancelled",
        "expired",
      ],
      default: "posted",
    },

    matchedNgo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    pickedUpAt: Date,
    deliveredAt: Date,
    verifiedAt: Date,

    receivedQuantity: {
      type: Number,
      default: 0,
    },

    cancellationReason: String,
  },
  {
    timestamps: true,
  }
);

donationSchema.index({
  "pickupLocation.coordinates": "2dsphere",
});

export default mongoose.model("Donation", donationSchema);
