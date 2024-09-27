const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig");

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
};

module.exports.renderNewForm = (req, res) => {
  console.log(res);
  res.render("listings/new");
};

module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "Successfully registered as an alumni!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};












module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    // Delete old image from Cloudinary
    if (listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  await listing.save();
  req.flash("success", "Successfully updated your profile!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }
  req.flash("success", "Successfully deleted your profile!");
  res.redirect("/listings");
};
