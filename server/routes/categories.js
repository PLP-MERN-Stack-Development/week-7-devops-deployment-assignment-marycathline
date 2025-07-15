// routes/categories.js

const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const {
  getAllCategories,
  createCategory,
} = require('../controllers/categoryController');

// Validation middleware for creating category
const validateCategory = [
  body('name')
    .notEmpty().withMessage('Category name is required'),
  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),

  // Validation error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// @route   GET /api/categories
router.get('/', getAllCategories);

// @route   POST /api/categories
router.post('/', validateCategory, createCategory);

module.exports = router;
