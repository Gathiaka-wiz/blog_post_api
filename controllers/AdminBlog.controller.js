import  BlogPost  from '../models/BlogPost.model.js';
import  User  from '../models/User.model.js';

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
        const { title, content } = req.body;
        const  blogId  = req.params.id;
        
        
        // Find the blog post by ID
        const blogPostExists = await BlogPost.findById(blogId);
        
        if (!blogPostExists) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        // Check if the user is the author of the blog post
        if (blogPostExists.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this blog post"
            });
        }

        const existingBlogTitle = BlogPost.findOne({ title });

        if ( blogPostExists.title === title && blogPostExists.content === content ) {
            return res.status(400).json({
                success: false,
                message: "No noticeable changes to be made"
            });
        };
        
        // Update the blog post
        blogPostExists.title = title;
        blogPostExists.content = content; 

        await blogPostExists.save();

        res.status(200).json({
            success: true,
            message: "Blog post updated successfully",
            blogPost: blogPostExists
        });

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
        const { title } = req.body;
        const blogId = req.params.id;

        // Find the blog post by ID
        const blogPostExists = await BlogPost.findById(blogId);

        if (!blogPostExists) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }
        
        // check if the blog post title matches the title in the request body
        if (blogPostExists.title !== title) {
            return res.status(400).json({
                success: false,
                message: "Blog post title does not match"
            });
        }


        // Check if the user is the author of the blog post
        if (blogPostExists.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog post"
            });
        }

        // Delete the blog post
        await BlogPost.findByIdAndDelete(blogId);

        res.status(200).json({
            success: true,
            message: "Blog post deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Error deleting blog",
            error: error.message
        });
        
    }
};

