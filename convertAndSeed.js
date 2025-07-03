require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Airport = require("./models/Airport"); // your existing model

const filePath = path.join(__dirname, "data", "airports.dat.txt");

const csv = fs.readFileSync(filePath, "utf-8").split("\n");

const parseNumber = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};

// Convert each CSV line into a structured airport object
const airports = csv.map((line) => {
  const parts = line.split(",");

  return {
    name: parts[1]?.replace(/"/g, ""),
    city: parts[2]?.replace(/"/g, ""),
    country: parts[3]?.replace(/"/g, ""),
    code: parts[4]?.replace(/"/g, ""), // IATA code
    icao: parts[5]?.replace(/"/g, ""),
    latitude: parseNumber(parts[6]),
    longitude: parseNumber(parts[7]),
    timezone: parts[11]?.replace(/"/g, "")
  };
});

// Filter invalid entries
const cleanedAirports = airports.filter(
  (a) => a.name && a.country && a.code && a.code !== "\\N"
);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Optional: remove old airports
    await Airport.deleteMany({});

    // Insert new ones
    await Airport.insertMany(cleanedAirports);

    console.log(`✅ Seeded ${cleanedAirports.length} airports`);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error importing airports:", err);
  }
};

seed();
