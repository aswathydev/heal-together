
const express = require("express");

const router = express.Router();
const { userOnly } = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
  registerProvider,
  loginProvider,
  getMe,
  loginAdmin,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// USER

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

// PROVIDER

router.post(
  "/provider/register",
  upload.single(
    "verificationDoc"
  ),
  registerProvider
);

router.post(
  "/provider/login",
  loginProvider
);

// CURRENT USER

router.get(
  "/me",
  protect,
  getMe
);



router.post(
  "/admin/login",
  loginAdmin
);

module.exports = router;