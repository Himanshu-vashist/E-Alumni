const Listing = require("./models/listing");  // Ensure correct path to listing model
const Review = require("./models/review");    // Ensure correct path to review model
const ExpressError = require("./utils/ExpressError"); // Ensure correct path to ExpressError utility
const { listingSchema, reviewSchema, feedbackSchema } = require("./schema"); // Ensure correct path and include feedbackSchema


// Middleware to set current user in res.locals
module.exports.setCurrUser = (req, res, next) => {
    res.locals.currUser = req.user; // Assuming req.user contains the logged-in user information
    next();
};

// Middleware to check if a user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    console.log("Checking if user is logged in or not");
    
    if (!req.isAuthenticated()) {
        console.log("Please logged in");
        
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to register as an alumnus!");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save the redirect URL for post-login redirection
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }
        if (!listing.owner.equals(req.user._id)) {
            req.flash("error", "You are not the owner of this alumni profile.");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (e) {
        req.flash("error", "An error occurred while checking ownership.");
        return res.redirect("/listings");
    }
};

// Middleware to validate listing data based on the schema
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body); // Ensure req.body is passed correctly
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware to validate review data based on the schema
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // Ensure req.body is passed correctly
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params; // Ensure reviewId is used correctly
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash("error", "Review not found.");
            return res.redirect(`/listings/${id}`);
        }
        if (!review.author.equals(req.user._id)) {
            req.flash("error", "You are not the author of this review.");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (e) {
        req.flash("error", "An error occurred while checking review authorship.");
        return res.redirect(`/listings/${id}`);
    }
};

// Middleware to validate feedback data based on the schema
module.exports.validateFeedback = (req, res, next) => {
    const { error } = feedbackSchema.validate(req.body); // Ensure req.body is passed correctly
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
