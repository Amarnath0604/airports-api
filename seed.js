require("dotenv").config();
const mongoose = require("mongoose");
const Airport = require("./models/Airport");

const airports = [
  { name: "Indira Gandhi International Airport", code: "DEL", state: "Delhi", country: "India" },
  { name: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM", state: "Maharashtra", country: "India" },
  { name: "Kempegowda International Airport", code: "BLR", state: "Karnataka", country: "India" },
  { name: "Rajiv Gandhi International Airport", code: "HYD", state: "Telangana", country: "India" },
  { name: "Chennai International Airport", code: "MAA", state: "Tamil Nadu", country: "India" },
  { name: "Netaji Subhas Chandra Bose International Airport", code: "CCU", state: "West Bengal", country: "India" },
  { name: "Sardar Vallabhbhai Patel International Airport", code: "AMD", state: "Gujarat", country: "India" },
  { name: "Cochin International Airport", code: "COK", state: "Kerala", country: "India" },
  { name: "Jay Prakash Narayan Airport", code: "PAT", state: "Bihar", country: "India" },
  { name: "Biju Patnaik International Airport", code: "BBI", state: "Odisha", country: "India" },
  { name: "Veer Savarkar International Airport", code: "IXZ", state: "Andaman and Nicobar Islands", country: "India" },
  { name: "Lokpriya Gopinath Bordoloi International Airport", code: "GAU", state: "Assam", country: "India" },
  { name: "Birsa Munda Airport", code: "IXR", state: "Jharkhand", country: "India" },
  { name: "Dr. Babasaheb Ambedkar International Airport", code: "NAG", state: "Maharashtra", country: "India" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Airport.deleteMany(); // Clear old data
    await Airport.insertMany(airports); // Insert new data

    console.log("✅ Airport data seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding airport data:", err);
  }
};

seedDB();
