import { Router } from 'express';
import { validationResult } from 'express-validator';


import { login, logout, signup, eraseData } from '../controllers/auth.controller.js';
import { signupValidation, loginValidation, eraseDataValidation } from '../middleware/validation.middleware.js';
import  verifyToken  from '../middleware/verifyToken.middleware.js';

const router = Router();


// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false, message: errors.array() });
    }
    next();
}

router.post('/signup', signupValidation, handleValidationErrors, signup );

router.post('/login', loginValidation, handleValidationErrors, login );

router.post('/logout', logout );

router.delete('/delete-account',eraseDataValidation, handleValidationErrors, verifyToken, eraseData );

export const AuthRoutes = router;