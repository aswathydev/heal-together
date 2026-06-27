const Mood =
  require("../models/Mood");

const {
  analyzeMood,
} = require("../services/geminiMoodAnalysis");

const scoreMap = {
  great: 4,
  okay: 3,
  low: 2,
  rough: 1,
};



exports.addMood = async (
    req,
    res
  ) => {
    try {
      const {
        mood,
        note,
      } = req.body;
  
      const entry =
        await Mood.create({
          user: req.user.id,
          mood,
          note,
          score: scoreMap[mood],
        });
  
      res.status(201).json({
        success: true,
        data: entry,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };



  exports.getHistory = async (
    req,
    res
  ) => {
    const moods =
      await Mood.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });
  
    res.json({
      success: true,
      data: moods,
    });
  };



  exports.weeklyTrend =
  async (req, res) => {
    const date = new Date();

    date.setDate(
      date.getDate() - 7
    );

    const moods =
      await Mood.find({
        user: req.user.id,
        createdAt: {
          $gte: date,
        },
      });

    res.json({
      success: true,
      data: moods,
    });
  };



  exports.monthlyTrend =
  async (req, res) => {
    const data =
      await Mood.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },
        {
          $group: {
            _id: {
              month: {
                $month:
                  "$createdAt",
              },
            },
            avg: {
              $avg: "$score",
            },
          },
        },
      ]);

    res.json({
      success: true,
      data,
    });
  };






  exports.streak =
  async (req, res) => {
    const moods =
      await Mood.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    let streak = 0;

    for (const mood of moods) {
      if (
        mood.mood ===
          "great" ||
        mood.mood === "okay"
      ) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      streak,
    });
  };



  exports.alert =
  async (req, res) => {
    const recent =
      await Mood.find({
        user: req.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(3);

    const alert =
      recent.every(
        m =>
          m.mood ===
            "low" ||
          m.mood ===
            "rough"
      );

    res.json({
      alert,
      message: alert
        ? "You may need additional support."
        : null,
    });
  };




  exports.aiAnalysis =
  async (req, res) => {
    const moods =
      await Mood.find({
        user: req.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(30);

    const analysis =
      await analyzeMood(
        moods
      );

    res.json({
      success: true,
      analysis,
    });
  };