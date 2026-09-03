const Blog = require("../models/Blog");


// ==========================================
// CREATE BLOG
// ==========================================

const createBlog = async (req, res) => {

    try {

        const {
            title,
            content
        } = req.body;


        if (!title || !content) {

            return res.status(400).json({

                message:
                    "Title and content are required"

            });

        }


        if (!req.userId) {

            return res.status(401).json({

                message:
                    "User authentication required"

            });

        }


        const blog =
            await Blog.create({

                title: title,

                content: content,

                author: req.userId

            });


        const populatedBlog =
            await Blog.findById(blog._id)
                .populate(
                    "author",
                    "name email"
                );


        res.status(201).json({

            message:
                "Blog created successfully",

            blog:
                populatedBlog

        });


    } catch (error) {

        console.error(
            "Create blog error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to create blog",

            error:
                error.message

        });

    }

};


// ==========================================
// GET ALL BLOGS
// ==========================================

const getBlogs = async (req, res) => {

    try {

        const blogs =
            await Blog.find()
                .populate(
                    "author",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            blogs: blogs

        });


    } catch (error) {

        console.error(
            "Get blogs error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to fetch blogs"

        });

    }

};


// ==========================================
// GET SINGLE BLOG
// ==========================================

const getBlogById = async (req, res) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            )
            .populate(
                "author",
                "name email"
            );


        if (!blog) {

            return res.status(404).json({

                message:
                    "Blog not found"

            });

        }


        res.status(200).json({

            blog: blog

        });


    } catch (error) {

        console.error(
            "Get blog error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to fetch blog"

        });

    }

};


// ==========================================
// DELETE BLOG
// ==========================================

const deleteBlog = async (req, res) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            );


        if (!blog) {

            return res.status(404).json({

                message:
                    "Blog not found"

            });

        }


        if (
            blog.author.toString() !==
            req.userId.toString()
        ) {

            return res.status(403).json({

                message:
                    "You can delete only your own blog"

            });

        }


        await Blog.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({

            message:
                "Blog deleted successfully"

        });


    } catch (error) {

        console.error(
            "Delete blog error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to delete blog"

        });

    }

};


module.exports = {

    createBlog,
    getBlogs,
    getBlogById,
    deleteBlog

};