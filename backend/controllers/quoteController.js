const Quote = require("../models/Quotes");
// const ai = require("../config/gemini");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate AI Quote
exports.generateQuote = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const promptText = `
Generate one inspirational quote about: "${prompt}"

Rules:
- Maximum 30 words
- Original quote
- Return ONLY the quote text
- No quotation marks
- No explanations
`;

    const result = await model.generateContent(promptText);

    console.log("RAW RESULT:", JSON.stringify(result, null, 2));

    const generatedQuote =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!generatedQuote) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate quote",
      });
    }

    const savedQuote = await Quote.create({
      prompt,
      quote: generatedQuote,
      author: "AI",
      model: "gemini-2.5-flash",
    });

    return res.status(201).json({
      success: true,
      data: savedQuote,
    });

  } catch (error) {
    console.error("Generate Quote Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// exports.generateQuote = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     console.log('generateQuote', prompt);

//     if (!prompt) {
//       return res.status(400).json({
//         success: false,
//         message: "Prompt is required",
//       });
//     }

//     const model = ai.getGenerativeModel({ 
//       model: 'gemini-2.5-flash', // Fast and cost-effective model
//       // systemInstruction: systemInstruction
//     });

//     const promptText = `
// Generate one inspirational quote about: "${prompt}"

// Rules:
// - Maximum 30 words
// - Original quote
// - Return ONLY the quote text
// - Do not add quotation marks
// - Do not add explanations
// `;

// const result = await model.generateContent(promptText);

// const generatedQuote = result.response.text().trim();

// console.log(generatedQuote);


//     // const contents = `
//     //     Generate one inspirational quote about:
//     //     "${prompt}"

//     //     Rules:
//     //     - Maximum 30 words
//     //     - Original quote
//     //     - Return ONLY the quote text
//     //     - Do not add quotation marks
//     //     - Do not add explanations
//     //   `
//     // console.log('MSG', contents);


//     // const response = await model.generateContent({ contents });



//     // const generatedQuote = response.text.trim();

//     const savedQuote = await Quote.create({
//       prompt,
//       quote: generatedQuote,
//       author: "AI",
//       model: "gemini-2.5-flash",
//     });

//     res.status(201).json({
//       success: true,
//       data: savedQuote,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one quote
exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    await Quote.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Quote deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};