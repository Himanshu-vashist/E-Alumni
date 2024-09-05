const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
