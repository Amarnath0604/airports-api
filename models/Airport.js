const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  name: String,
  code: String,
  state: String,
  country: String,
});

module.exports = mongoose.model("Airport", airportSchema);
