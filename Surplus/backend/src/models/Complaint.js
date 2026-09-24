import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "investigating", "resolved", "dismissed"],
      default: "open",
    },

    adminNotes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Complaint", complaintSchema);
