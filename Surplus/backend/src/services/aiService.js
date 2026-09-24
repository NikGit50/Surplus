const fallbackExtraction = (text) => {
  const quantityMatch = text.match(
    /(\d+(?:\.\d+)?)\s*(kg|kilograms|g|grams|litres|liters|packets|units)/i
  );

  const quantity = quantityMatch
    ? Number(quantityMatch[1])
    : null;

  const unit = quantityMatch
    ? quantityMatch[2].toLowerCase()
    : null;

  let dietaryType = "unknown";

  if (/vegetarian|veg\b/i.test(text)) {
    dietaryType = "vegetarian";
  }

  if (/vegan/i.test(text)) {
    dietaryType = "vegan";
  }

  if (/non[- ]?veg|chicken|meat|fish/i.test(text)) {
    dietaryType = "non-vegetarian";
  }

  return {
    foodName: "",
    category: "Other",
    quantity,
    unit,
    packagingCondition: "",
    dietaryType,
    availableFrom: new Date().toISOString(),
    deadline: "",
    specialInstructions: text,
  };
};

export const extractDonationInformation =
  async (text) => {
    if (!text?.trim()) {
      throw new Error(
        "Donation description is required"
      );
    }

    if (
      !process.env.LLM_API_URL ||
      !process.env.LLM_API_KEY
    ) {
      return fallbackExtraction(text);
    }

    const response = await fetch(
      process.env.LLM_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.LLM_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.LLM_MODEL,
          messages: [
            {
              role: "system",
              content: `
Extract structured food donation information.

Return JSON only with:
foodName,
category,
quantity,
unit,
packagingCondition,
dietaryType,
availableFrom,
deadline,
specialInstructions.

Do not invent information.
Use null where information is missing.
              `,
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "AI extraction service failed"
      );
    }

    const data = await response.json();

    const content =
      data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(
        "AI returned no structured result"
      );
    }

    return JSON.parse(content);
  };
