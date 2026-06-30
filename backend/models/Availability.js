const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
    {
      providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true,
      },
  
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
  
      startTime: String,
      endTime: String,
  
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model(
    "Availability",
    availabilitySchema
  );