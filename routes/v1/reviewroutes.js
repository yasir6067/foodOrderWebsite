const express = require("express");
const { userauth } = require("../../middlewares/userauth");
const { getAverageRating, addReview, getFoodReviews, deleteReview } = require("../../controllers/reviewcontrollers");

const router = express.Router();

router.get("/avg-rating/:foodItemId", userauth, getAverageRating);
router.get("/food-reviews/:foodItemId", userauth, getFoodReviews);
router.post("/add-review", userauth, addReview);
router.delete("/delete/:reviewId", userauth, deleteReview); // Changed to DELETE method

module.exports = { reviewRouter: router };
