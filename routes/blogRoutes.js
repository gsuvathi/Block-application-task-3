const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// GET ALL BLOGS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const blogs = await Blog.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            blogs: blogs
        });

    } catch (error) {

        console.error("Get blogs error:", error);

        res.status(500).json({
            message: "Failed to fetch blogs"
        });
    }
});


// ==========================================
// CREATE BLOG
// ==========================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, content } = req.body;

        if (!title || !content) {

            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        if (!req.user || !req.user.id) {

            return res.status(401).json({
                message: "User authentication required"
            });
        }

        const blog = await Blog.create({

            title: title.trim(),

            content: content.trim(),

            author: req.user.name || "User",

            userId: req.user.id

        });

        console.log("BLOG CREATED:", blog);

        res.status(201).json({

            message: "Blog created successfully",

            blog: blog

        });

    } catch (error) {

        console.error("Create blog error:", error);

        res.status(500).json({

            message: "Failed to create blog",

            error: error.message

        });
    }
});


// ==========================================
// GET SINGLE BLOG
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json({
            blog: blog
        });

    } catch (error) {

        console.error("Get single blog error:", error);

        res.status(500).json({
            message: "Failed to fetch blog"
        });
    }
});


// ==========================================
// DELETE BLOG
// ==========================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (
            !req.user ||
            blog.userId.toString() !== req.user.id.toString()
        ) {

            return res.status(403).json({
                message: "You can delete only your own blog"
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Blog deleted successfully"

        });

    } catch (error) {

        console.error("Delete blog error:", error);

        res.status(500).json({

            message: "Failed to delete blog"

        });
    }
});


module.exports = router;