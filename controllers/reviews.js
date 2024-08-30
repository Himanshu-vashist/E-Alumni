
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let { review } = req.body;
  //console.log(review)

  let listing = await Listing.findById(id);
  let newReview = new Review(review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success","New Review Added");
  res.redirect(`/listings/${id}`);
}

  

  

 module.exports.destroyReview=async (req,res)=>{
    let {id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
 
 
   //res.redirect('/listings/${id}');
 };


