const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getUserAppointments,
  getSingleAppointment,
  cancelAppointment,

  getProviderAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
  updateMeetingLink,

  getAllAppointments,
  deleteAppointment,
  getAppointmentStats,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");
const {
  userOnly,
  providerOnly,
  adminOnly,
} = require("../middleware/roleMiddleware");


// ====================
// USER ROUTES
// ====================

// Book appointment
router.post(
  "/",
  protect,
  // userOnly,
  createAppointment
);

// Get logged-in user's appointments
router.get(
  "/my",
  protect,
  userOnly,
  getUserAppointments
);

// Get single appointment
router.get(
  "/:id",
  protect,
  getSingleAppointment
);

// Cancel appointment
router.patch(
  "/:id/cancel",
  protect,
  userOnly,
  cancelAppointment
);


// ====================
// PROVIDER ROUTES
// ====================

// Provider appointments
router.get(
  "/provider/all",
  protect,
  providerOnly,
  getProviderAppointments
);

// Approve appointment
router.patch(
  "/provider/:id/approve",
  protect,
  providerOnly,
  approveAppointment
);

// Reject appointment
router.patch(
  "/provider/:id/reject",
  protect,
  providerOnly,
  rejectAppointment
);

// Complete appointment
router.patch(
  "/provider/:id/complete",
  protect,
  providerOnly,
  completeAppointment
);

// Add meeting link
router.patch(
  "/provider/:id/meeting",
  protect,
  providerOnly,
  updateMeetingLink
);


// ====================
// ADMIN ROUTES
// ====================

// Get all appointments
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllAppointments
);

// Delete appointment
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteAppointment
);

// Appointment statistics
router.get(
  "/admin/stats",
  protect,
  adminOnly,
  getAppointmentStats
);


module.exports = router;