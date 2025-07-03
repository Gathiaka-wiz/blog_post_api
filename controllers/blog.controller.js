import BlogPost from "../models/BlogPost.model.js";


export const getAllBlogs = async (req, res) => {
    try {
            const blogs = await BlogPost.find({})
                    .populate('author', 'name').
                        populate({
                            path:'comments',
                            populate:{
                                path:'user',
                                select:'name'
                            } 
                    });


            const editedBlog =  blogs.map( (blog) => {
                    return{
                        ...blog._doc,
                        author: blog.author.name,
                        likes: blog.likes.length,
                        comments: blog.comments.map(comment => {
                            return {
                                _id:comment._id,
                                name:comment.user?.name,
                                text:comment.text,
                                post:comment.post,
                                createdAt:comment.createdAt
                            }
                        })
                }
            })
        
            // const editedBlog = blogs.map( (blog) => { return blog.title } )


        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blogs:editedBlog
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

        const blog = await BlogPost.findById(id)
                .populate('author', 'name')
                .populate({ 
                    path:'comments',
                    populate:{
                        path:'user',
                        select:'name'
                    }
                });
        
        await res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            // blog:formattedBlog,
            blog:{
                ...blog._doc,
                author: blog.author.name,
                likes: blog.likes.length,
                comments: blog.comments.map(comment => {
                    return {
                        _id:comment._id,
                        name:comment.user?.name,
                        text:comment.text,
                        post:comment.post,
                        createdAt:comment.createdAt
                    }
                })
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error ${ error.message }`
        });
    }       
};