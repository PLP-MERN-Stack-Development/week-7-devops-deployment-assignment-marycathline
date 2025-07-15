// controllers/postController.js

const Post = require('../models/Post');

// GET /api/posts - fetch all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email') // adjust fields if needed
      .populate('category', 'name');

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:id - fetch a single post
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Increment view count using the model method
    await post.incrementViewCount();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// POST /api/posts - create a new post
const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/:id - update an existing post
const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id - delete a post
const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
