import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message:
      "Surplus-to-Shelter API is running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/donations",
  donationRoutes
);

app.use(
  "/api/ngos",
  ngoRoutes
);

app.use(
  "/api/drivers",
  driverRoutes
);

app.use(
  "/api/deliveries",
  deliveryRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(notFound);
app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
