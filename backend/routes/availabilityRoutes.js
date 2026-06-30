// routes/availabilityRoutes.js

const express = require("express");
const router = express.Router();

const {
  createAvailability,
  getProviderAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

const  protect  = require("../middleware/authMiddleware");
const { providerOnly } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  providerOnly,
  createAvailability
);

router.get(
  "/provider/:providerId",
  getProviderAvailability
);

router.put(
  "/:id",
  protect,
  providerOnly,
  updateAvailability
);

router.delete(
  "/:id",
  protect,
  providerOnly,
  deleteAvailability
);

module.exports = router;