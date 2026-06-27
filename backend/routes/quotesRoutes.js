const express = require("express");
const router = express.Router();

const {
  generateQuote,
  getQuotes,
  getQuote,
  deleteQuote,
} = require("../controllers/quoteController");

router.post("/generate", generateQuote);

router.get("/", getQuotes);

router.get("/:id", getQuote);

router.delete("/:id", deleteQuote);

module.exports = router;