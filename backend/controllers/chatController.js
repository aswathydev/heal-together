// controllers/chatController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');

// Initialize Gemini API with your free API key
// const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY});
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// FIX: Pass the key directly as a string argument, not an object

exports.handleChatMessage = async (req, res) => {  
  try {
    const { message } = req.body;
    // console.log('MSG', message);

    const userId = req.user.id; // From your auth middleware

    // console.log('req.user.id', req.user.id);

    // 1. System prompt to guide the AI's behavior and personality
    const systemInstruction = `
      You are an empathetic, supportive, and non-judgmental mental wellness assistant. 
      Your goal is to actively listen, validate feelings, and suggest light coping mechanisms (like breathing exercises or journaling).
      CRITICAL: You are not a licensed therapist or doctor. If the user expresses severe distress, self-harm, or emergency intent, you must immediately provide a supportive refusal and direct them to professional helplines.
    `;

    // 2. Fetch or create the user's chat history from MongoDB
    let chatSession = await Chat.findOne({ userId });
    if (!chatSession) {
      chatSession = new Chat({ userId, messages: [] });
    }

    // 3. Format the history so the Gemini API understands the context
    const contents = chatSession.messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Append the current user message
    contents.push({ role: 'user', parts: [{ text: message }] });
    console.log('MSG', contents);

    // 4. Call the Gemini model
    const model = ai.getGenerativeModel({ 
      model: 'gemini-2.5-flash', // Fast and cost-effective model
      systemInstruction: systemInstruction
    });

    const result = await model.generateContent({ contents });
    const aiResponseText = result.response.text();

    // 5. Save both messages to your MongoDB history
    chatSession.messages.push({ sender: 'user', text: message });
    chatSession.messages.push({ sender: 'ai', text: aiResponseText });
    await chatSession.save();

    // 6. Return the response to the client
    res.status(200).json({
      success: true,
      reply: aiResponseText
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({ success: false, message: 'Failed to process chat' });
  }
};