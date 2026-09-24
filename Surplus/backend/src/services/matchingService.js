import Donation from "../models/Donation.js";
import User from "../models/User.js";
import Match from "../models/Match.js";

const calculateDistanceKm = (
  [lon1, lat1],
  [lon2, lat2]
) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
};

const calculateFoodCompatibility = (
  donation,
  ngo
) => {
  const required =
    ngo.requiredCategories || [];

  if (!required.length) {
    return 50;
  }

  const category = donation.category.toLowerCase();

  const match = required.some(
    (item) =>
      item.toLowerCase() === category
  );

  return match ? 100 : 0;
};

const calculateCapacityCompatibility = (
  donation,
  ngo
) => {
  const available =
    Math.max(
      0,
      (ngo.maximumCapacity || 0) -
        (ngo.currentStock || 0)
    );

  if (available >= donation.quantity) {
    return 100;
  }

  if (available > 0) {
    return 50;
  }

  return 0;
};

export const findMatchesForDonation = async (
  donationId
) => {
  const donation = await Donation.findById(
    donationId
  );

  if (!donation) {
    throw new Error("Donation not found");
  }

  const ngos = await User.find({
    role: "ngo",
    isActive: true,
    verificationStatus: "verified",
  });

  const results = [];

  for (const ngo of ngos) {
    const donorCoords =
      donation.pickupLocation.coordinates;

    const ngoCoords =
      ngo.location?.coordinates || [0, 0];

    const distance = calculateDistanceKm(
      donorCoords,
      ngoCoords
    );

    const foodCompatibility =
      calculateFoodCompatibility(
        donation,
        ngo
      );

    const capacityCompatibility =
      calculateCapacityCompatibility(
        donation,
        ngo
      );

    const distanceScore =
      Math.max(0, 100 - distance * 10);

    const totalScore =
      distanceScore * 0.25 +
      foodCompatibility * 0.30 +
      capacityCompatibility * 0.20 +
      donation.urgencyScore * 0.15 +
      80 * 0.10;

    if (
      foodCompatibility > 0 &&
      capacityCompatibility > 0
    ) {
      results.push({
        ngo,
        distance,
        foodCompatibility,
        capacityCompatibility,
        urgencyScore:
          donation.urgencyScore,
        operationalScore: 80,
        totalScore: Math.round(totalScore),
      });
    }
  }

  results.sort(
    (a, b) => b.totalScore - a.totalScore
  );

  await Match.deleteMany({
    donation: donationId,
  });

  const matches = await Match.insertMany(
    results.map((result) => ({
      donation: donationId,
      ngo: result.ngo._id,
      distance: result.distance,
      foodCompatibility:
        result.foodCompatibility,
      capacityCompatibility:
        result.capacityCompatibility,
      urgencyScore: result.urgencyScore,
      operationalScore:
        result.operationalScore,
      totalScore: result.totalScore,
    }))
  );

  return matches;
};
