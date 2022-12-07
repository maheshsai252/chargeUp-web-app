const mongoose = require("mongoose");
const User = require("./user.model");
const Event = require('./event.model').schema;
const Schema = mongoose.Schema;
const Registration = mongoose.model(
  "Registration",
  new mongoose.Schema({
    event: {
      type: Schema.Types.ObjectId, 
      
  },
    user: {
      type: Schema.Types.ObjectId, 
      
  },
  },{
    timestamps: true
})
);

module.exports = Registration;