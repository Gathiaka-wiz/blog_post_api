import { Router } from "express";

// middleware imports
import verifyToken from "../middleware/verifyToken.middleware.js";
import { isAdmin } from "../middleware/verifyAdmin.middleware.js";

// controllers imports
import { createBlog, editBlog, deleteBlog, getUSers } from "../controllers/AdminBlog.controller.js";
import { createBlogValidation, deleteBlogValidation, editBlogValidation } from "../middleware/validation.middleware.js";

const router = Router();

router.use(verifyToken)
router.use(isAdmin);



router.post('/blogs/create-blog',createBlogValidation,  createBlog );

router.patch('/blogs/edit-blog/:id', editBlogValidation, editBlog );

router.delete('/blogs/delete-blog/:id',deleteBlogValidation, deleteBlog );

router.get('/users', getUSers);


export const AdminBlogRoutes = router;