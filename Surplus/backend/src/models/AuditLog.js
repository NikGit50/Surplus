import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    entity: String,

    entityId: String,

    details: mongoose.Schema.Types.Mixed,

    ipAddress: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AuditLog", auditLogSchema);
