const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        console.log("Register request received");

        const { firstname, lastname, email, password } = req.body;

        // Check that all the data should exist
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send("User already exists!");
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        // Generate a token for user and send it
        const token = jwt.sign({ id: user._id, email, role:user.role }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        res.status(200).json({ message: "You have successfully registered!", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        console.log("Login request received");
        console.log(req.body.email);

        const { email, password } = req.body;

        // Check that all the data should exist
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        // Match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id , role:user.role}, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        // Store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, // Only manipulate by server not by client/user
        };

        // Send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};