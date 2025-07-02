import { body } from 'express-validator';
import { param } from 'express-validator';

// Auth validation
export const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters').escape(),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role').escape(),
];

export const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').escape(),
];

export const eraseDataValidation = [
    body('password').notEmpty().withMessage('Password is required').escape(),
];


// Blog validation
export const createBlogValidation = [
    body('title').trim().notEmpty().withMessage('Title is required').escape(),
    body('content').trim().notEmpty().withMessage('Content is required').escape(),
];

export const editBlogValidation = [
    param('id').isMongoId().withMessage('Invalid blog id'),
    body('title').trim().notEmpty().withMessage('Title is required').escape(),
    body('content').trim().notEmpty().withMessage('Content is required').escape(),
];

export const deleteBlogValidation = [
    param('id').isMongoId().withMessage('Invalid blog id'),
    body('title').trim().notEmpty().withMessage('Title is required').escape(),
];


// Comment validation
export const createCommentValidation = [
    param('id').isMongoId().withMessage('Invalid blog id'),
    body('post').isMongoId().withMessage('Invalid blog id'),
    body('text').trim().notEmpty().withMessage('Content is required').escape(),
];


export const updateCommentValidation = [
    param('id').isMongoId().withMessage('Invalid blog id'),
    param('commentId').isMongoId().withMessage('Invalid comment id'),
    body('text').trim().notEmpty().withMessage('Content is required').escape(),
];


export const deleteCommentValidation = [
    param('id').isMongoId().withMessage('Invalid blog id'),
    param('commentId').isMongoId().withMessage('Invalid comment id').escape(),
];


// Like validation
export const likeBlogValidation = [
    param('id').isMongoId().withMessage('Invalid Blog id').escape()
]
