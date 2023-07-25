const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photo: {
    type: [String],
  },
  perks: {
    type: [String],
  },
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
  },
  checkOut: {
    type: Number,
  },
  maxGuests: {
    type: Number,
  },
});

module.exports = mongoose.model("Place", placeSchema);
