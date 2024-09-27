const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackSchema'); // Import the Feedback model

// Middleware to validate feedback data
const validateFeedback = (req, res, next) => {
    const { name, email, subject, message } = req.body.feedback;
    if (!name || !email || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }
    // Additional validation logic can go here (e.g., email format)
    next();
};

// Route to handle feedback form submission
router.post('/feedback', validateFeedback, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body.feedback;

        // Create a new feedback entry
        const newFeedback = new Feedback({
            name,
            email,
            subject,
            message
        });

        // Save feedback to the database
        await newFeedback.save();
        res.redirect('/feedback/all'); // Redirect to a thank you page after submission
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting feedback. Please try again later.');
    }
});

// Route to display all feedback (for testing)
router.get('/feedback/all', async (req, res) => {
    try {
        const allFeedback = await Feedback.find();
        console.log (" feedback data");
        res.render('feedbackList', { feedbacks: allFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching feedback. Please try again later.');
    }
});

module.exports = router;
