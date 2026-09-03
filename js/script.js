// ==========================================
// LOAD DASHBOARD BLOGS
// ==========================================

async function loadDashboardBlogs() {

    const blogList =
        document.getElementById("dashboardBlogList");

    const totalBlogs =
        document.getElementById("totalBlogs");

    if (!blogList) {
        return;
    }

    const token =
        localStorage.getItem("token");

    if (!token) {

        window.location.href = "login.html";

        return;
    }

    try {

        blogList.innerHTML =
            "<p>Loading blogs...</p>";

        const response = await fetch(
            "http://localhost:5000/api/blogs"
        );

        const data = await response.json();

        console.log("Dashboard blogs:", data);

        if (!response.ok) {

            throw new Error(
                data.message || "Failed to load blogs"
            );
        }

        const blogs = data.blogs || [];

        totalBlogs.textContent = blogs.length;

        if (blogs.length === 0) {

            blogList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>

                    <h3>No blogs yet</h3>

                    <p>
                        You haven't created any blogs.
                        Start writing your first blog!
                    </p>

                    <a
                        href="create-blog.html"
                        class="primary-btn">
                        + Create Your First Blog
                    </a>
                </div>
            `;

            return;
        }

        blogList.innerHTML = "";

        blogs.forEach(function (blog) {

            const card =
                document.createElement("div");

            card.className = "blog-card";

            const date =
                new Date(blog.createdAt)
                    .toLocaleDateString();

            const shortContent =
                blog.content.length > 180
                    ? blog.content.substring(0, 180) + "..."
                    : blog.content;

            card.innerHTML = `

                <div class="blog-card-content">

                    <span class="blog-date">
                        ${date}
                    </span>

                    <h3>
                        ${blog.title}
                    </h3>

                    <p>
                        ${shortContent}
                    </p>

                    <div class="blog-footer">

                        <span>
                            ✍️ ${blog.author}
                        </span>

                        <a
                            href="blog-details.html?id=${blog._id}"
                            class="read-more">
                            Read More →
                        </a>

                    </div>

                </div>

            `;

            blogList.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        blogList.innerHTML = `
            <div class="error-box">
                <h3>Unable to load blogs</h3>

                <p>
                    ${error.message}
                </p>

                <button
                    onclick="loadDashboardBlogs()"
                    class="primary-btn">
                    Try Again
                </button>
            </div>
        `;
    }
}


// ==========================================
// RUN DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboardBlogs();

    }
);