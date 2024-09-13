const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ensure this matches the actual model name
        required: true,
    },
    foodItemId: { // Changed to camelCase for consistency
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem", // Ensure this matches the actual model name
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model("Review", reviewSchema); // Capitalized model name

module.exports = { Review };
