const mongoose = require("mongoose");
const { type } = require("os");
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
 
  graduationYear: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
 country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});

const Listing = mongoose.model("listings", listingSchema);
module.exports = Listing;
