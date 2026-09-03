const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

// If user is not logged in
if (!token) {
    window.location.href = "login.html";
}

// Display username
if (userData) {

    const user = JSON.parse(userData);

    document.getElementById("welcomeUser").textContent =
        "Welcome, " + user.name;
}


// LOGOUT
document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";
    });


// LOAD BLOGS
async function loadBlogs() {

    try {

        const response = await fetch("/api/blogs");

        const blogs = await response.json();

        const container =
            document.getElementById("blogsContainer");

        container.innerHTML = "";

        if (blogs.length === 0) {

            container.innerHTML =
                "<p>No blogs available.</p>";

            return;
        }

        blogs.forEach(blog => {

            const div = document.createElement("div");

            div.className = "blog-card";

            const shortContent =
                blog.content.length > 150
                    ? blog.content.substring(0, 150) + "..."
                    : blog.content;

            div.innerHTML = `
                <h3>${blog.title}</h3>

                <p>
                    ${shortContent}
                </p>

                <small>
                    By ${blog.author}
                </small>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);

    }
}


// CREATE BLOG
document
    .getElementById("blogForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const title =
            document.getElementById("title").value.trim();

        const content =
            document.getElementById("content").value.trim();

        const blogMessage =
            document.getElementById("blogMessage");

        try {

            const response = await fetch("/api/blogs", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "Authorization":
                        "Bearer " + token
                },

                body: JSON.stringify({
                    title,
                    content
                })

            });

            const data = await response.json();

            if (response.ok) {

                blogMessage.textContent =
                    "Blog created successfully!";

                document
                    .getElementById("blogForm")
                    .reset();

                loadBlogs();

            } else {

                blogMessage.textContent =
                    data.message || "Failed to create blog";

            }

        } catch (error) {

            console.error(error);

            blogMessage.textContent =
                "Server error";

        }

    });


// Load blogs when page opens
loadBlogs();