// controllers/availabilityController.js

const Availability = require("../models/Availability");

exports.createAvailability = async (req, res) => {
  try {
    console.log('Availabaility', req.body);
    const availability = await Availability.create({
      providerId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProviderAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({
      providerId: req.params.providerId,
      isAvailable: true,
    }).sort({
      day: 1,
      startTime: 1,
    });

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const availability =
      await Availability.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    await Availability.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Availability deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};