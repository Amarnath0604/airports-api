const express = require("express");
const router = express.Router();
const Airport = require("../models/Airport");

// GET /api/airports?country=India&state=Kerala
router.get("/", async (req, res) => {
  const { country, state } = req.query;

  try {
    const query = {};

    // Case-insensitive country and state match
    if (country) {
      query.country = new RegExp(`^${country}$`, "i");
    }

    if (state) {
      query.state = new RegExp(`^${state}$`, "i");
    }

    const airports = await Airport.find(query);
    res.json(airports);
  } catch (err) {
    console.error("❌ Error fetching airports:", err);
    res.status(500).json({ error: "Failed to fetch airports" });
  }
});

module.exports = router;
