const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");

// const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend domain in production
  credentials: true
}));

// Middleware
app.use(express.json());

connectDB()

// Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('🍀 Connected to MongoDB successfully'))
//   .catch(err => console.error('Database connection error:', err));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const quoteRoutes = require('./routes/quotesRoutes');
const moodRoutes = require("./routes/moodRoutes");
const postRoutes = require('./routes/postRoutes');
const journalRoutes = require('./routes/journalRoutes');
const contactRoutes = require('./routes/contactRoutes');
const availabilityRoutes = require("./routes/availabilityRoutes");
// const appointmentRoutes = require("./routes/appointmentsRoutes");


app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/quotes', quoteRoutes);
app.use("/api/moods", moodRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/contacts', contactRoutes);
/* Availability */
app.use(
  "/api/availability",
  availabilityRoutes
);

/* Appointments */
// app.use(
//   "/api/appointments",
//   appointmentRoutes
// );


app.use('/api/provider', require('./routes/providerRoutes'));

// app.use("/api/appointments", appointmentRoutes);

// app.use('/api/admin', require('./routes/adminRoutes'));
// app.use('/api/user', require('./routes/userRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));