// const Journal = require('../models/Journal');

// // Helper function simulating lightweight AI Sentiment analysis
// function generateAiPrompt(content, moodTag) {
//   const text = content.toLowerCase();
  
//   if (text.includes('stressed') || text.includes('anxious') || moodTag === 'anxious') {
//     return "It sounds like you're carrying a heavy load. What is one small thing you can take off your plate today?";
//   }
//   if (text.includes('sad') || text.includes('lonely') || moodTag === 'sad') {
//     return "Acknowledging sadness takes courage. What did a comforting moment look like for you in the past?";
//   }
//   if (text.includes('happy') || text.includes('proud') || moodTag === 'happy') {
//     return "Celebrate this feeling! What specific choice or event led to this positive energy?";
//   }
//   return "Thank you for sharing your thoughts. Reflecting on this, what is a lesson you'd like to remember tomorrow?";
// }

// // @desc    Create a new journal entry
// // @route   POST /api/journals
// exports.createEntry = async (req, res) => {
//   try {
//     const { title, content, moodTag } = req.body;
    
//     // Safety check
//     if (!title || !content) {
//       return res.status(400).json({ message: "Title and content are required." });
//     }

//     // Generate simulated AI dynamic prompt based on content
//     const aiPrompt = generateAiPrompt(content, moodTag);

//     const newEntry = new Journal({
//       userId: req.user.id, // Populated from your auth middleware
//       title,
//       content,
//       moodTag,
//       aiPrompt
//     });

//     const savedEntry = await newEntry.save();
//     res.status(201).json(savedEntry);
//   } catch (err) {
//     res.status(500).json({ message: "Server error creating journal entry.", error: err.message });
//   }
// };

// // @desc    Get all journal entries for logged-in user
// // @route   GET /api/journals
// exports.getEntries = async (req, res) => {
//   try {
//     const entries = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.json(entries);
//   } catch (err) {
//     res.status(500).json({ message: "Server error fetching entries." });
//   }
// };


const Journal = require('../models/Journal'); // Adjust path based on your setup

// Simple logic simulating an AI generating a reflective prompt based on the mood
function generateAIReflection(mood, content) {
  const prompts = {
    happy: "It's wonderful to capture these moments. What specifically about this experience brought you the most joy, and how can you invite more of it into your week?",
    anxious: "Your feelings are completely valid. Looking closely at what you wrote, what is one tiny aspect of this situation that is completely within your control to change or accept?",
    sad: "Allow yourself space to feel this. If a close friend came to you carrying this exact sadness today, what gentle words of comfort would you offer them?",
    neutral: "Reflecting on your day with calm eyes is an excellent habit. If you had to pick one subtle lesson or observation from today, what would it be?"
  };

  return prompts[mood.toLowerCase()] || prompts.neutral;
}

// @desc    Create a new journal entry with AI reflection
// @route   POST /api/journals
exports.createEntry = async (req, res) => {
  try {
    const { title, content, moodTag } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required fields." });
    }

    // Trigger the simulated AI Reflection Prompt
    const aiPrompt = generateAIReflection(moodTag || 'neutral', content);

    const newEntry = new Journal({
      userId: req.user.id, // Populated by your auth middleware
      title,
      content,
      moodTag: moodTag || 'neutral',
      aiPrompt
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ message: "Error saving journal entry.", error: err.message });
  }
};

// @desc    Get all journal entries for the logged-in user
// @route   GET /api/journals
exports.getEntries = async (req, res) => {
  try {
    // Only fetch entries belonging to the authenticated user
    const entries = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Newest entries first

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching journal history.", error: err.message });
  }
};

// @desc    Get a single journal entry by ID
// @route   GET /api/journals/:id
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Journal.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    // Security check: Make sure the entry belongs to the logged-in user
    if (entry.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to access this entry." });
    }

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving journal entry.", error: err.message });
  }
};