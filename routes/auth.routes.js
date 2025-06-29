import { Router } from 'express';
import { login, logout, signup, eraseData } from '../controller/auth.controller.js';

const router = Router();

router.post('/signup', signup );

router.post('/login', login );

router.post('/logout', logout );

router.delete('/delete', eraseData );

export const AuthRoutes = router;