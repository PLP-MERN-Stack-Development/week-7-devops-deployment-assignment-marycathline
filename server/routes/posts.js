// routes/posts.js

const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const { body, validationResult } = require('express-validator');

// Validation middleware
const validatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('content')
    .notEmpty().withMessage('Content is required'),
  body('slug')
    .notEmpty().withMessage('Slug is required'),
  body('author')
    .notEmpty().withMessage('Author ID is required')
    .isMongoId().withMessage('Invalid author ID'),
  body('category')
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Invalid category ID'),
  body('excerpt')
    .optional()
    .isLength({ max: 200 }).withMessage('Excerpt cannot exceed 200 characters'),
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be true or false'),

  // Catch validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
router.delete('/:id', deletePost);

module.exports = router;
