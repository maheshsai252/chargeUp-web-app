const mongoose = require("mongoose");
const User = require("./user.model");
const Location = require('./location.model').schema
const Schema = mongoose.Schema;
const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [String],
    price: Number,
    type: String,
    startDate: Date,
    endDate: Date,
    latitude: Number,
    longitude: Number,
    available: {
      type: Number,
      default: 10,
      min: 0
    },
    capacity: {
      type: Number,
      default: 10,
      min: 0
    },
    place: String,
    createdBy: { 
      type: Schema.Types.ObjectId, // here is the issue
      ref: 'User'
  },
  nameTag: {
    type: String,
    required: true,
    unique: true
  },
  filenames: [String]
  },{ timestamps: true })
);

module.exports = {Event};