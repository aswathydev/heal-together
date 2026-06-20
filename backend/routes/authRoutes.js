// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { registerUser, registerProvider, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/verification_docs/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });
  
//   const upload = multer({ storage: storage });

// // Public Access Endpoints
// router.post('/register-user', registerUser);
// router.post('/register-provider', upload.single('verificationDoc'), registerProvider);
// router.post('/login', login);

// // Protected Identity State Anchor
// router.get('/me', protect, getMe);

// module.exports = router;


const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  registerProvider,
  loginProvider,
  getMe,
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

module.exports = router;