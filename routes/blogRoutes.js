const express = require("express");

const router = express.Router();

const {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

// Create blog
router.post("/", authMiddleware, createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Delete blog
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;