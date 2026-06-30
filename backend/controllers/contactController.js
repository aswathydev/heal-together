const Contact = require('../models/Contact');

// @desc    Submit a new contact support message
// @route   POST /api/contacts
// @access  Public
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation check
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All form fields are required." });
    }

    const newContactMessage = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContactMessage.save();

    res.status(201).json({ 
      success: true,
      message: "Your inquiry has been logged successfully! Our team will get back to you shortly." 
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting support ticket.", error: err.message });
  }
};

// @desc    Get all support tickets (Optional: For Admin Dashboards)
// @route   GET /api/contacts
// @access  Private (Admin Only)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching support logs.", error: err.message });
  }
};