const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "AI",
    },
    model: {
      type: String,
      default: "gemini-2.5-flash",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);