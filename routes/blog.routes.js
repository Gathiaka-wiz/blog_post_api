import { application, Router } from 'express';

import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = Router();

router.use(verifyUser);

router.get('/', getAllBlogs);

router.get('/:id', getBlogById);


export const BlogRoutes = router;