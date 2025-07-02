import { Router } from 'express';


// Middleware import
import verifyToken from '../middleware/verifyToken.middleware.js';
import { verifyUser } from '../middleware/verifyUser.middleware.js';
import { likeBlogValidation } from '../middleware/validation.middleware.js';

import { likeBlog } from '../controllers/like.controller.js'

const router = Router();


// Middleware
router.use(verifyToken);
router.use(verifyUser);


router.post('/:id/like', likeBlogValidation, likeBlog);


export const LikeRoutes = router