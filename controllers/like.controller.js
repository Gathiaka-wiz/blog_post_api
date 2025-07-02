import BlogPost from "../models/BlogPost.model.js";

export const likeBlog = async (req,res) => {
    try {
        const blogId = req.params.id;
        const userId = req.userId.toString();

        // Check if blog exists
        const blog = await BlogPost.findById( blogId );

        if (!blog) {
            return res.status(400).json({
                success:false,
                message:"Blog post not found"
            });
        };
        
        const alreadyLiked = blog.likes.includes( userId );

        if (alreadyLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
            await blog.save();
            return res.status(200).json({ message: 'blog unliked.', likesCount: blog.likes.length });
        } else {
            blog.likes.push(userId);
            await blog.save();
            return res.status(200).json({ message: 'blog liked.', likesCount: blog.likes.length });
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Something went wrong please try again : ${error}`
        });
    }
};