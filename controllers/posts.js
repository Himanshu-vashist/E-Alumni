const Post = require('../models/post');

// Render form to create a new post
exports.renderNewPostForm = (req, res) => {
    res.render('../listings/newpost');
};

// Handle form submission and save the post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.redirect('/posts');
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).send("An error occurred while saving the post.");
    }
};

// Fetch and render all posts
exports.listPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('../listings/posts', { posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("An error occurred while fetching posts.");
    }
};
