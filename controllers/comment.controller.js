import Comment from "../models/Comment.model.js";
import Blog from "../models/BlogPost.model.js";

export const createComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.userId;
        const { text } = req.body;

        // Validate blog existence
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ 
                success: false,
                message: "Blog not found" 
            });
        }

        // Create a new comment
        const comment = new Comment ({
            text,
            user: userId,
            post: blogId,
            createdAt: new Date()
        })

        await comment.save();
        blog.comments.push(comment._id);
        await blog.save();

        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment
        });


    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error : Error creating comment " 
        });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.status(404).json({ 
                success: false,
                message: "Blog not found" 
            });
        }

        // const comments = blog.comments;
        const comments = await Comment.find({ post: blog }).populate('user', 'name')  

        res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            comments
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error : Error retrieving comments" 
        });
    }
}

export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.userId;
        const { text } = req.body

        const comment = await Comment.findById(commentId);
        
        // check if comment id exists in the blog
        if ( !comment ) {
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            });
        };

        // Check if comment belongs to logged user
        if ( comment.user.toString() !==  userId  ) {
            return res.status(405).json({
                success:false,
                message:"Comment edit authorization denied"
            });
        };
        
        // Check if comment text content is the same

        if ( comment.text === text ) {
            return res.status(400).json({
                success:false,
                message:"No noticeable changes to be made"
            });
        }

        // update comment
        comment.text = text;

        await comment.save();

        res.status(200).json({
            success:true,
            message:"Comment edited successfully",
            comment
        })

        


    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error : Error updating comment" 
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.userId;
        
        const comment = await Comment.findById(commentId);
        
        // check if comment id exists in the blog
        if ( !comment ) {
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            });
        };

        // Check if comment belongs to logged user
        if ( comment.user.toString() !==  userId  ) {
            return res.status(405).json({
                success:false,
                message:"Comment deletion authorization denied"
            });
        };


        //Remove comment from associated post
        await Blog.findByIdAndUpdate(comment.post, {
            $pull: { comments: comment._id }
        });

        await comment.deleteOne();


        res.status(200).json({
            success:true,
            message:"Comment deleted successfully"
        })


    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error : Error deleting comment" 
        });
    }
}