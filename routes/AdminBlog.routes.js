import { Router } from "express";

// middleware imports
import verifyToken from "../middleware/verifyToken.middleware.js";
import { isAdmin } from "../middleware/verifyAdmin.middleware.js";

// controllers imports
import { createBlog, editBlog, deleteBlog } from "../controllers/AdminBlog.controller.js";
import { createBlogValidation, deleteBlogValidation, editBlogValidation } from "../middleware/validation.middleware.js";

const router = Router();

router.use(verifyToken)
router.use(isAdmin);



router.post('/create-blog',createBlogValidation,  createBlog );

router.patch('/edit-blog/:id', editBlogValidation, editBlog );

router.delete('/delete-blog/:id',deleteBlogValidation, deleteBlog );


export const AdminBlogRoutes = router;