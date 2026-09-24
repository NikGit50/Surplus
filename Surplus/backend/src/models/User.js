import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["donor", "ngo", "driver", "admin"],
      required: true,
    },

    organizationName: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    profileImage: String,

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    // NGO fields
    maximumCapacity: {
      type: Number,
      default: 0,
    },

    currentStock: {
      type: Number,
      default: 0,
    },

    beneficiaries: {
      type: Number,
      default: 0,
    },

    requiredCategories: {
      type: [String],
      default: [],
    },

    dietaryPreferences: {
      type: [String],
      default: [],
    },

    minimumQuantity: {
      type: Number,
      default: 0,
    },

    maximumAcceptableQuantity: {
      type: Number,
      default: 0,
    },

    // Driver fields
    vehicleType: String,

    vehicleCapacity: {
      type: Number,
      default: 0,
    },

    driverStatus: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "offline",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: "2dsphere" });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
