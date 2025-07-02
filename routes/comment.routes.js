import { Router } from "express";

// Middleware
import verifyToken from "../middleware/verifyToken.middleware.js";
import { createCommentValidation, updateCommentValidation, deleteCommentValidation } from "../middleware/validation.middleware.js";

import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/comment.controller.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = Router();


router.use(verifyToken); // Verify JWT token for all routes in this router
router.use(verifyUser); // Verify user for all routes in this router

router.post("/:id/create", createCommentValidation, createComment); // Create a new comment

router.get("/:id", getAllComments); // Get all comments

router.patch("/update/:commentId",updateCommentValidation, updateComment); // Update a comment by ID

router.delete("/delete/:commentId",deleteCommentValidation, deleteComment); // Delete a comment by ID

export const CommentRoutes = router;

