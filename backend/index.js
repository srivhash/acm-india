const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { DBConnection } = require("./database/db.js");
const User = require("./model/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

// Routes
const mentorRoutes = require('./routes/Mentor');
app.use('/api/mentors', mentorRoutes);

const authRoutes = require('./routes/Auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/User');
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});