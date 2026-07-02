const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // Patient/User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Doctor/Therapist
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    // Selected service
    service: {
      type: String,
      required: true,
    },

    // Appointment date
    appointmentDate: {
      type: Date,
      required: true,
    },

    // Optional start/end time
    startTime: {
      type: String, // "10:00 AM"
    },

    endTime: {
      type: String, // "11:00 AM"
    },

    // Appointment status
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "completed",
        "cancelled",
        "rejected",
      ],
      default: "pending",
    },

    // Payment details
    amount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "pending",
    },
    sessionType: {
        type: String,
        enum: ["Chat Session", "Video Call", "Voice Call"],
        default: "Video Call",
    },

    // Online meeting
    meetingLink: {
      type: String,
      default: "",
    },

    // User note
    userNote: {
      type: String,
      default: "",
    },

    // Provider note
    providerNote: {
      type: String,
      default: "",
    },

    // Session summary
    sessionSummary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);