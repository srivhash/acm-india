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

const pairingRoutes = require('./routes/Pairing');
app.use('/api/pairings', pairingRoutes);

// Utility function to get all routes
const getRoutes = (app) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // Route middleware
            routes.push({
                path: middleware.route.path,
                method: Object.keys(middleware.route.methods).join(', ').toUpperCase(),
            });
        } else if (middleware.name === 'router') { // Router middleware
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: handler.route.path,
                        method: Object.keys(handler.route.methods).join(', ').toUpperCase(),
                    });
                }
            });
        }
    });
    return routes;
};

// Log all routes
console.log(getRoutes(app));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});