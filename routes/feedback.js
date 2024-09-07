const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const wrapAsync = require("../utils/wrapAsync");
const { validateFeedback, isLoggedIn } = require("../middleware");

// Render feedback form
router.get("/",(req,res,next)=>{
console.log("render feedback form just after loggin check");
console.log(isLoggedIn);

next();
}, isLoggedIn, (req, res) => {
    res.render("listings/feedback"); // Make sure this view exists
});

// Handle feedback submission
router.post("/", isLoggedIn, validateFeedback, wrapAsync(async (req, res) => {
    const feedback = new Feedback(req.body.feedback);
    await feedback.save();
    req.flash("success", "Thank you for your feedback!");
    res.redirect("/feedback");
}));

module.exports = router;
