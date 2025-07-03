const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  name: String,
  code: String,
  icao: String,
  city: String,
  state: String,
  country: String,
  latitude: Number,
  longitude: Number,
  timezone: String,
});

module.exports = mongoose.model("Airport", airportSchema);
