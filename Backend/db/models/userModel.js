const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 30,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User
};
