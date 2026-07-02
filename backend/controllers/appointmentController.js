// controllers/appointmentController.js

const Appointment = require("../models/Appointments");

exports.createAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.create({
        userId: req.user.id,
        ...req.body,
      });

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find({
          userId: req.user._id,
        })
          .populate(
            "providerId",
            "name specialization"
          )
          .sort({
            appointmentDate: -1,
          });

      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getProviderAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find({
          providerId: req.user._id,
        })
          .populate(
            "userId",
            "name email"
          )
          .sort({
            appointmentDate: -1,
          });

      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.updateAppointmentStatus =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.cancelAppointment =
  async (req, res) => {
    try {
      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Appointment cancelled",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };