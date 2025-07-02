import BlogPost from "../models/BlogPost.model.js";


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find({})


        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error ${ error.message }`
        });
    }       
};

export const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;

        const existingBlog = await BlogPost.findById(id);

        if ( !existingBlog ) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog: existingBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error ${ error.message }`
        });
    }       
};