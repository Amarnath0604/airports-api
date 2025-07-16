const express = require("express");
const router = express.Router();
const Airport = require("../models/Airport");

// GET /api/airports?country=India&state=Kerala
router.get("/", async (req, res) => {
  const { country } = req.query;

  try {
    const query = {};

    if (country) {
      query.country = new RegExp(`^${country}$`, "i");
    }

    const airports = await Airport.find(query);
    res.json(airports);
  } catch (err) {
    console.error("❌ Error fetching airports:", err);
    res.status(500).json({ error: "Failed to fetch airports" });
  }
});

module.exports = router;
