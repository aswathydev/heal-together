const User = require("../models/User");
const Provider = require("../models/Provider");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// USER REGISTER

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      token: generateToken(
        user._id,
        user.role
      ),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// USER LOGIN

exports.loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    let user =
      await User.findOne({ email });

      if (!user) {
        user = await Provider.findOne({ email });
      }

      if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(
        user._id,
        user.role
      ),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PROVIDER REGISTER

exports.registerProvider =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        phone,
        specialization,
        qualification,
        licenseNumber,
        experienceYears,
        services,
        bio,
      } = req.body;

      const exists =
        await Provider.findOne({
          email,
        });

      if (exists) {
        return res.status(400).json({
          message:
            "Provider already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const provider =
        await Provider.create({
          name,
          email,
          password:
            hashedPassword,

          phone,
          specialization,
          qualification,
          licenseNumber,
          experienceYears,

          services:
            services?.split(",") ||
            [],

          bio,
          verificationDoc:
            req.file
              ? req.file.filename
              : "",
        });

      res.status(201).json({
        success: true,
        token: generateToken(
          provider._id,
          provider.role
        ),
        user: provider,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// PROVIDER LOGIN

exports.loginProvider =
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      const provider =
        await Provider.findOne({
          email,
        });

      if (!provider) {
        return res.status(404).json({
          message:
            "Provider not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          provider.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid credentials",
        });
      }

      res.status(200).json({
        success: true,
        token: generateToken(
          provider._id,
          provider.role
        ),
        provider,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// CURRENT USER

exports.getMe = async (
  req,
  res
) => {
  try {
    let data;

    if (req.user.role === "user") {
      data =
        await User.findById(
          req.user.id
        ).select("-password");
    }

    if (
      req.user.role ===
      "provider"
    ) {
      data =
        await Provider.findById(
          req.user.id
        ).select("-password");
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};