import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      organizationName,
      address,
      location,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required",
      });
    }

    const allowedRoles = ["donor", "ngo", "driver"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration role",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      organizationName,
      address,
      location: location
        ? {
            type: "Point",
            coordinates: location,
          }
        : undefined,
    });

    const safeUser = await User.findById(user._id).select(
      "-password"
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const safeUser = await User.findById(user._id).select(
      "-password"
    );

    res.json({
      success: true,
      token: generateToken(user._id),
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "phone",
      "organizationName",
      "address",
      "maximumCapacity",
      "currentStock",
      "beneficiaries",
      "requiredCategories",
      "dietaryPreferences",
      "minimumQuantity",
      "maximumAcceptableQuantity",
      "vehicleType",
      "vehicleCapacity",
      "driverStatus",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (req.body.location) {
      updates.location = {
        type: "Point",
        coordinates: req.body.location,
      };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
