import {
  extractDonationInformation,
} from "../services/aiService.js";

export const extractDonation = async (
  req,
  res
) => {
  try {
    const { text } = req.body;

    const result =
      await extractDonationInformation(text);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
