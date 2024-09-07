const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
// Route to render the form for creating a new post
router.get('/newpost', postsController.renderNewPostForm);

// Route to handle the form submission
router.post('/new', postsController.createPost);

// Route to list all posts
router.get('/posts', postsController.listPosts);

module.exports = router;
