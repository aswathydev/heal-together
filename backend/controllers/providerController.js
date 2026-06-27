const Provider = require("../models/Provider");

exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    console.error("Get providers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch providers",
      error: error.message,
    });
  }
};