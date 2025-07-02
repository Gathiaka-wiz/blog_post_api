import { application, Router } from 'express';

// middleware imports
import { verifyUser } from "../middleware/verifyUser.middleware.js";

// controllers imports
import { getAllBlogs, getBlogById } from '../controllers/blog.controller.js';


const router = Router();

router.use(verifyUser);

router.get('/', getAllBlogs);

router.get('/:id', getBlogById);


export const BlogRoutes = router;