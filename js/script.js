// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const navLinks = document.getElementById("navLinks");

    if (navLinks) {
        navLinks.classList.toggle("show");
    }
}


// ========================================
// GET USERS
// ========================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem("blogUsers")
    ) || [];

}


// ========================================
// SAVE USERS
// ========================================

function saveUsers(users) {

    localStorage.setItem(
        "blogUsers",
        JSON.stringify(users)
    );

}


// ========================================
// GET BLOGS
// ========================================

function getBlogs() {

    return JSON.parse(
        localStorage.getItem("blogPosts")
    ) || [];

}


// ========================================
// SAVE BLOGS
// ========================================

function saveBlogs(blogs) {

    localStorage.setItem(
        "blogPosts",
        JSON.stringify(blogs)
    );

}


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("registerName")
                .value
                .trim();


            const email =
                document.getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById("registerPassword")
                .value;


            const confirmPassword =
                document.getElementById("confirmPassword")
                .value;


            const message =
                document.getElementById("registerMessage");


            // Check name

            if (name.length < 3) {

                message.textContent =
                    "Name must contain at least 3 characters.";

                message.style.color = "#dc2626";

                return;
            }


            // Check email

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color = "#dc2626";

                return;
            }


            // Check password

            if (password.length < 6) {

                message.textContent =
                    "Password must contain at least 6 characters.";

                message.style.color = "#dc2626";

                return;
            }


            // Check confirm password

            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color = "#dc2626";

                return;
            }


            const users = getUsers();


            // Check existing email

            const existingUser =
                users.find(
                    function (user) {

                        return user.email === email;

                    }
                );


            if (existingUser) {

                message.textContent =
                    "An account with this email already exists.";

                message.style.color = "#dc2626";

                return;
            }


            // Create user

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);

            saveUsers(users);


            message.textContent =
                "Registration successful! Redirecting to login...";

            message.style.color = "#16a34a";


            registerForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1500
            );

        }
    );

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById("loginPassword")
                .value;


            const message =
                document.getElementById("loginMessage");


            const users = getUsers();


            const user =
                users.find(
                    function (item) {

                        return (
                            item.email === email &&
                            item.password === password
                        );

                    }
                );


            if (!user) {

                message.textContent =
                    "Invalid email or password.";

                message.style.color = "#dc2626";

                return;
            }


            // Save logged-in user

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            message.textContent =
                "Login successful! Redirecting...";

            message.style.color = "#16a34a";


            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                1000
            );

        }
    );

}


// ========================================
// CREATE BLOG
// ========================================

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById("blogTitle")
                .value
                .trim();


            const category =
                document.getElementById("blogCategory")
                .value;


            const content =
                document.getElementById("blogContent")
                .value
                .trim();


            const message =
                document.getElementById("blogMessage");


            const currentUser =
                JSON.parse(
                    localStorage.getItem("currentUser")
                );


            // Check login

            if (!currentUser) {

                message.textContent =
                    "Please login before creating a blog.";

                message.style.color = "#dc2626";

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );

                return;
            }


            // Validate title

            if (title.length < 5) {

                message.textContent =
                    "Blog title must contain at least 5 characters.";

                message.style.color = "#dc2626";

                return;
            }


            // Validate category

            if (!category) {

                message.textContent =
                    "Please select a category.";

                message.style.color = "#dc2626";

                return;
            }


            // Validate content

            if (content.length < 20) {

                message.textContent =
                    "Blog content must contain at least 20 characters.";

                message.style.color = "#dc2626";

                return;
            }


            const blogs = getBlogs();


            const newBlog = {

                id: Date.now(),

                title: title,

                category: category,

                content: content,

                author: currentUser.name,

                authorEmail: currentUser.email,

                date: new Date().toLocaleDateString()

            };


            blogs.push(newBlog);

            saveBlogs(blogs);


            message.textContent =
                "Blog published successfully!";

            message.style.color = "#16a34a";


            blogForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                1000
            );

        }
    );

}


// ========================================
// LOAD DASHBOARD
// ========================================

function loadDashboard() {

    const blogList =
        document.getElementById("dashboardBlogList");


    if (!blogList) {
        return;
    }


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (!currentUser) {

        window.location.href =
            "login.html";

        return;
    }


    const welcomeUser =
        document.getElementById("welcomeUser");


    if (welcomeUser) {

        welcomeUser.textContent =
            "Welcome back, " +
            currentUser.name +
            "!";

    }


    const allBlogs = getBlogs();


    const userBlogs =
        allBlogs.filter(
            function (blog) {

                return (
                    blog.authorEmail ===
                    currentUser.email
                );

            }
        );


    const totalBlogs =
        document.getElementById("totalBlogs");


    if (totalBlogs) {

        totalBlogs.textContent =
            userBlogs.length;

    }


    displayBlogs(userBlogs);

}


// ========================================
// DISPLAY BLOGS
// ========================================

function displayBlogs(blogs) {

    const blogList =
        document.getElementById(
            "dashboardBlogList"
        );


    if (!blogList) {
        return;
    }


    blogList.innerHTML = "";


    if (blogs.length === 0) {

        blogList.innerHTML = `

            <div class="empty-state">

                <h3>
                    No blogs yet
                </h3>

                <p>
                    Create your first blog and share your story.
                </p>

                <br>

                <a
                    href="create-blog.html"
                    class="primary-btn">

                    Create Blog

                </a>

            </div>

        `;

        return;
    }


    blogs.forEach(
        function (blog) {

            const blogElement =
                document.createElement("div");


            blogElement.className =
                "dashboard-blog";


            blogElement.innerHTML = `

                <div>

                    <span class="category">
                        ${blog.category}
                    </span>

                    <h3>
                        ${escapeHTML(blog.title)}
                    </h3>

                    <p>
                        ${escapeHTML(
                            blog.content.substring(0, 120)
                        )}...
                    </p>

                    <small>
                        Published: ${blog.date}
                    </small>

                </div>


                <div class="dashboard-blog-actions">

                    <button
                        class="edit-btn"
                        onclick="editBlog(${blog.id})">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id})">

                        Delete

                    </button>

                </div>

            `;


            blogList.appendChild(blogElement);

        }
    );

}


// ========================================
// SEARCH BLOGS
// ========================================

function searchBlogs() {

    const searchInput =
        document.getElementById(
            "searchBlogs"
        );


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (!currentUser) {
        return;
    }


    const allBlogs = getBlogs();


    const userBlogs =
        allBlogs.filter(
            function (blog) {

                return (
                    blog.authorEmail ===
                    currentUser.email
                );

            }
        );


    const filteredBlogs =
        userBlogs.filter(
            function (blog) {

                return (

                    blog.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    blog.category
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    blog.content
                        .toLowerCase()
                        .includes(searchText)

                );

            }
        );


    displayBlogs(filteredBlogs);

}


// ========================================
// DELETE BLOG
// ========================================

function deleteBlog(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmed) {
        return;
    }


    let blogs = getBlogs();


    blogs =
        blogs.filter(
            function (blog) {

                return blog.id !== id;

            }
        );


    saveBlogs(blogs);


    loadDashboard();

}


// ========================================
// EDIT BLOG
// ========================================

function editBlog(id) {

    const blogs = getBlogs();


    const blog =
        blogs.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!blog) {
        return;
    }


    const newTitle =
        prompt(
            "Enter new blog title:",
            blog.title
        );


    if (newTitle === null) {
        return;
    }


    const newContent =
        prompt(
            "Enter new blog content:",
            blog.content
        );


    if (newContent === null) {
        return;
    }


    blog.title =
        newTitle.trim();


    blog.content =
        newContent.trim();


    saveBlogs(blogs);


    loadDashboard();

}


// ========================================
// LOGOUT
// ========================================

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";

}


// ========================================
// HTML SECURITY HELPER
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

        console.log(
            "BlogSpace loaded successfully!"
        );

    }
);