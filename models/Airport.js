const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  name: String,
  code: String,
  icao: String,
  city: String,
  country: String,
  latitude: Number,
  longitude: Number,
  timezone: String,
});

airportSchema.index({ country: 1 });

module.exports = mongoose.model("Airport", airportSchema);
