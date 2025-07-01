import { Router } from "express";

// middleware imports
import verifyToken from "../middleware/verifyToken.middleware.js";
import { isAdmin } from "../middleware/verifyAdmin.middleware.js";

// controllers imports
import { createBlog, editBlog, deleteBlog } from "../controllers/blog.controller.js";
import { createBlogValidation, deleteBlogValidation, editBlogValidation } from "../middleware/validation.middleware.js";


const router = Router();

router.use(verifyToken)
router.use(isAdmin);

router.post('/create',createBlogValidation,  createBlog );

router.post('/edit', editBlogValidation, editBlog );

router.delete('/delete',deleteBlogValidation, deleteBlog );


export const BlogRoutes = router;