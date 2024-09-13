const { FoodItem } = require("../models/fooditemsmodels");
const { Review } = require("../models/reviewmodel");

const addReview = async (req, res) => {
    try {
        const { foodItemId, rating, comment } = req.body;
        const userId = req.user.id;

        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        const review = await Review.findOneAndUpdate(
            { userId, foodItemId },
            { rating, comment },
            { new: true, upsert: true }
        );

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getFoodReviews = async (req, res) => {
    try {
        const { foodItemId } = req.params;
        const reviews = await Review.find({ foodItemId }).populate("foodItemId", "name").sort({ createdAt: -1 });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this food item" });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getAverageRating = async (req, res) => {
    try {
        const { foodItemId } = req.params;
        const reviews = await Review.find({ foodItemId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for the food item" });
        }
        const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        res.status(200).json({ average });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { getAverageRating, deleteReview, addReview, getFoodReviews };
