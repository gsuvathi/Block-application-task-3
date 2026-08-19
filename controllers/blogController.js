const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const blog = await Blog.create({
            title,
            content,
            author: req.userId
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error("Create blog error:", error);

        res.status(500).json({
            message: "Failed to create blog",
            error: error.message
        });
    }
};


// Get All Blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json({
            blogs
        });

    } catch (error) {
        console.error("Get blogs error:", error);

        res.status(500).json({
            message: "Failed to fetch blogs",
            error: error.message
        });
    }
};


// Get Single Blog
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            blog
        });

    } catch (error) {
        console.error("Get blog error:", error);

        res.status(500).json({
            message: "Failed to fetch blog",
            error: error.message
        });
    }
};


// Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.userId.toString()) {
            return res.status(403).json({
                message: "You can delete only your own blog"
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error("Delete blog error:", error);

        res.status(500).json({
            message: "Failed to delete blog",
            error: error.message
        });
    }
};


module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlog
};