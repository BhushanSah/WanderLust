require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderLust"; // must match what you check in mongosh

async function seedDB() {
  await mongoose.connect(Mongo_URL);
  console.log("Connected to database");

  await Listing.deleteMany({});

  const ownerId = new mongoose.Types.ObjectId("69a7826aa6ad25ec9a46b100");

  const seeded = [];

  for (let obj of initData.data) {
    const query = `${obj.location}, ${obj.country}`;

    let geometry = { type: "Point", coordinates: [0, 0] }; // fallback always

    try {
      const response = await geocodingClient
        .forwardGeocode({ query, limit: 1 })
        .send();

      const match = response.body.features && response.body.features[0];
      if (match && match.geometry && match.geometry.type && match.geometry.coordinates) {
        geometry = match.geometry;
      } else {
        console.log("No geocode match:", query);
      }
    } catch (e) {
      console.log("Geocode error:", query, e.message);
    }

    seeded.push({
      ...obj,
      owner: ownerId,
      geometry
    });
  }

  await Listing.insertMany(seeded);

  const count = await Listing.countDocuments();
  console.log("Seed complete. Listings in DB:", count);

  await mongoose.connection.close();
}

seedDB().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});