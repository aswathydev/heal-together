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

const protect =
  require("../middleware/authMiddleware");

const mood =
  require("../controllers/moodController");

router.post(
  "/",
  protect,
  mood.addMood
);

router.get(
  "/history",
  protect,
  mood.getHistory
);

router.get(
  "/weekly",
  protect,
  mood.weeklyTrend
);

router.get(
  "/monthly",
  protect,
  mood.monthlyTrend
);

router.get(
  "/streak",
  protect,
  mood.streak
);

router.get(
  "/alert",
  protect,
  mood.alert
);

router.get(
  "/analysis",
  protect,
  mood.aiAnalysis
);

module.exports = router;