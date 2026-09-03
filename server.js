const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================================
// STATIC FILES
// ==========================================

app.use(express.static(__dirname));


// ==========================================
// MONGODB
// ==========================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });


// ==========================================
// ROUTES
// ==========================================

const authRoutes =
    require("./routes/authRoutes");

const blogRoutes =
    require("./routes/blogRoutes");


app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/blogs",
    blogRoutes
);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "index.html"
        )
    );

});


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});