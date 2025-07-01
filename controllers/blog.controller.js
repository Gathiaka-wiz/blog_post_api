import  BlogPost  from '../models/BlogPost.js';
import  User  from '../models/User.js';

export const  createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {

        // Check if the blog already exists
        const existingBlogPost = await BlogPost.findOne({ title });

        if (existingBlogPost) {
            return res.status(400).json({
                success: false,
                message: "BlogPost with this title already exists, please use a different title"
            });
        }

        // Create a new BlogPost
        const blogPost = new BlogPost({
            title,
            content,
            author: req.userId,
            // comments: [],
            // createdAt: Date.now (),
        });

        await blogPost.save();

        res.status(201).json({
            success:true,
            message: "Blog created successfully",
            blogPost
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message 
        });
        
    }
};

export const  editBlog = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error : Error editing blog",
            error: error.message
        });
        
    }
};

export const  deleteBlog = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Error deleting blog",
            error: error.message
        });
        
    }
};

