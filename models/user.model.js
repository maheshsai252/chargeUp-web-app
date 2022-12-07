const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    googleid: String,
    file: String,
    favourites: [String],
    interests: [String]
  })
);

module.exports = User;