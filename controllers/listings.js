const Listing=require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.index = async (req, res) => {
  let query = req.query.q;
  //console.log(query)
  let allListings = [];
  if(query === "trending"){
    allListings = await Listing.find({});
  }
  else if (query) {
    const validCategories = ["mountains", "arctic", "castles", "amazing pools", "farms", "camping", "rooms", "iconic cities", "domes", "boats"];
  
    allListings = await Listing.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Match title
        { location: { $regex: query, $options: 'i' } }, // Match location
        { country: { $regex: query, $options: 'i' } }, // Match country
        { category: { $in: validCategories, $regex: query, $options: 'i' } } // Match category with valid categories
      ]
    });
  }
  else {
    allListings = await Listing.find({});
  }
  res.render("listings/index.ejs", { allListings });
}


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};











module.exports.showListing=async(req,res)=>{
    let {id}= req.params;
    const listing =await Listing.findById(id)
    .populate({
      path: "reviews", 
        populate: {
          path:"author",
    },
  })
    .populate("owner");
    if(!listing){
      req.flash("error", "Listing you requested for does not exists!");
      res.redirect("/listings");
    }
    console.log(listing);
    
    res.render("show.ejs",{listing});
  };


 module.exports.createListing= async (req, res,next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    
    const newListing=new Listing(req.body.listing);
  
    newListing.owner = req.user._id;
    newListing.image= { url, filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};


    module.exports.editListing = async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
      }
      let originalUrl = listing.image.url;
      originalUrl = originalUrl.replace("/upload","/upload/w_250")
      res.render("listings/edit.ejs", { listing ,originalUrl});
    }



 module.exports.updateListing = async (req, res) => {
        let { id } = req.params;
       
      let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

      if(typeof req.file !== "undefined") {
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image= {  url, filename};
      await listing.save();
      }

      req.flash("success","Listing updated!");
      res.redirect(`/listings/${id}`);
      };

module.exports.destroyListing= async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","Listing Deleted!");
        res.redirect("/listings");
        };