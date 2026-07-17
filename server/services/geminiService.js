const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateRecommendation = async (user, schemes) => {
  const prompt = `
You are JanMitra AI.

Citizen Profile:
${JSON.stringify(user, null, 2)}

Top Eligible Government Schemes:
${JSON.stringify(schemes, null, 2)}

Generate a response with:

1. Short summary
2. Why the citizen is eligible
3. Benefits of each scheme
4. Required documents
5. Next steps to apply

Keep the language simple and encouraging.
Do not invent any scheme details.
Use only the information provided.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = generateRecommendation;