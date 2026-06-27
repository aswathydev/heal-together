const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      enum: [
        "great",
        "okay",
        "low",
        "bad",
        "rough",
      ],
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    aiInsight: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Mood", moodSchema);