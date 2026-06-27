const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );
  
  exports.analyzeMood = async (
    moodHistory
  ) => {
    try {
      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });
  
      const prompt = `
  Analyze this mood history:
  
  ${JSON.stringify(moodHistory)}
  
  Return:
  - emotional trend
  - possible triggers
  - positive observations
  - recommendations
  - risk level
  `;
  
      const result =
        await model.generateContent(
          prompt
        );
  
      return result.response.text();
    } catch {
      return "Unable to generate insight.";
    }
  };