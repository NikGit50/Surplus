import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    distance: {
      type: Number,
      default: 0,
    },

    foodCompatibility: {
      type: Number,
      default: 0,
    },

    capacityCompatibility: {
      type: Number,
      default: 0,
    },

    urgencyScore: {
      type: Number,
      default: 0,
    },

    operationalScore: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "expired"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Match", matchSchema);
