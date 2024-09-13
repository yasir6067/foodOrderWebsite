const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,  // Fixed spelling
        trim: true,
    }
    
});

const Admin = mongoose.model("Admin", adminSchema); // Capitalized model name

module.exports = { Admin };