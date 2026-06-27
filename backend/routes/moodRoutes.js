// const express = require("express");
// const router = express.Router();

// const {
//   addMood,
//   getMoodHistory,
//   getMoodAnalysis,
// } = require("../controllers/moodController");

// const protect = require("../middleware/authMiddleware");


// // Add mood
// router.post(
//   "/",
//   protect,
//   addMood
// );

// // Mood history
// router.get(
//   "/history",
//   protect,
//   getMoodHistory
// );

// // Mood analysis
// router.get(
//   "/analysis",
//   protect,
//   getMoodAnalysis
// );

// module.exports = router;



const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const mood =
  require("../controllers/moodController");

router.post(
  "/",
  auth,
  mood.addMood
);

router.get(
  "/history",
  auth,
  mood.getHistory
);

router.get(
  "/weekly",
  auth,
  mood.weeklyTrend
);

router.get(
  "/monthly",
  auth,
  mood.monthlyTrend
);

router.get(
  "/streak",
  auth,
  mood.streak
);

router.get(
  "/alert",
  auth,
  mood.alert
);

router.get(
  "/analysis",
  auth,
  mood.aiAnalysis
);

module.exports = router;