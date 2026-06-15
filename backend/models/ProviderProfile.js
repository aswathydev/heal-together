const mongoose = require('mongoose');

const ProviderProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    services: [{ type: String }], // Array generated from your comma-separated input
    bio: String,
    documentUrl: { type: String }, // Stores path to uploaded certificate/license file
    isVerified: { type: Boolean, default: false }
    
}, { timestamps: true });

module.exports = mongoose.model('ProviderProfile', ProviderProfileSchema);