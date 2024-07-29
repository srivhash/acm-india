const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
    },
    lastname: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

module.exports = mongoose.model("user", userSchema);