const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    specialization: {
      type: String,
    },

    qualification: {
      type: String,
    },

    licenseNumber: {
      type: String,
    },

    experienceYears: {
      type: Number,
    },

    services: [String],

    bio: {
      type: String,
    },

    verificationDoc: { type: String },
    
    role: {
      type: String,
      default: "provider",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Provider",
  providerSchema
);




// const mongoose = require('mongoose');

// const ProviderProfileSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//     phone: { type: String, required: true },
//     specialization: { type: String, required: true },
//     qualification: { type: String, required: true },
//     licenseNumber: { type: String, required: true },
//     experienceYears: { type: Number, required: true },
//     services: [{ type: String }], // Array generated from your comma-separated input
//     bio: String,
//     documentUrl: { type: String }, // Stores path to uploaded certificate/license file
//     isVerified: { type: Boolean, default: false }
    
// }, { timestamps: true });

// module.exports = mongoose.model('ProviderProfile', ProviderProfileSchema);