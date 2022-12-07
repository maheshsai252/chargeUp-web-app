const mongoose = require("mongoose");

const Venue = mongoose.model(
  "Venue",
  new mongoose.Schema({
    name: String,
    capacity: Number,
    type: String,
    rows: Number,
    cols: Number,
    spaceAfterRow: Number,
    latitude: Number,
    longitude: Number
  })
);

module.exports = Venue;