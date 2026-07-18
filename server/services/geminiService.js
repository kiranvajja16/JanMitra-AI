const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateRecommendation = async (user, schemes) => {
const prompt = `
You are JanMitra AI.

Citizen Profile:
${JSON.stringify(user, null, 2)}

Eligible Government Schemes:
${JSON.stringify(schemes, null, 2)}

Return ONLY valid JSON.

Use exactly this format:

{
  "summary": "Short summary of the citizen's eligibility.",
  "schemes": [
    {
      "name": "Scheme Name",
      "whyEligible": [
        "Reason 1",
        "Reason 2"
      ],
      "benefits": [
        "Benefit 1",
        "Benefit 2"
      ],
      "documents": [
        "Document 1",
        "Document 2"
      ],
      "nextSteps": [
        "Step 1",
        "Step 2"
      ]
    }
  ],
  "finalAdvice": "A short concluding recommendation."
}

Rules:
- Return ONLY JSON.
- Do not wrap it inside markdown.
- Do not use \`\`\`json.
- Do not include any extra text.
`;

  try {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  let text = response.text.trim();

  
  text = text.replace(/```json/gi, "");
  text = text.replace(/```/g, "");
  text = text.trim();

  try {
    return JSON.parse(text);
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError);
    console.log("Gemini Response:", text);

    return {
      summary:
        "AI generated a response, but it was not in the expected JSON format.",
      schemes: [],
      finalAdvice:
        "Please review the eligible schemes listed below.",
    };
  }
} catch (error) {
  console.error("Gemini Error:", error.message);

  return {
    summary:
      "AI recommendation is temporarily unavailable.",
    schemes: [],
    finalAdvice:
      "Please review the eligible schemes listed below.",
  };
}
};

module.exports = generateRecommendation;