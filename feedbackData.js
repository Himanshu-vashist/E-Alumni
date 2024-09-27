const mongoose = require('mongoose');
const Feedback = require('./models/feedbackSchema'); // Ensure this path is correct
const feedbackData = [
    {
        name: "Himanshu Vashist",
        email: "himanshu@example.com",
        subject: "Website Feedback",
        message: "I love the design of the website! It's very user-friendly.",
        created_at: new Date("2024-09-01T10:00:00")
    },
    {
        name: "Subhash Kumar",
        email: "subhash@example.com",
        subject: "Feature Request",
        message: "It would be great to have a chatbot feature for quick queries.",
        created_at: new Date("2024-09-02T11:30:00")
    },
    {
        name: "Ankita Sharma",
        email: "ankita@example.com",
        subject: "General Inquiry",
        message: "How can I reset my password on the alumni portal?",
        created_at: new Date("2024-09-03T09:45:00")
    }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-ALUMNI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Insert feedback data
        return Feedback.insertMany(feedbackData);
    })
    .then(() => {
        console.log('Sample feedback inserted successfully');
        mongoose.connection.close(); // Close the connection after the insertion
    })
    .catch(err => {
        console.log('Error inserting sample feedback:', err);
        mongoose.connection.close(); // Close the connection on error
    });
