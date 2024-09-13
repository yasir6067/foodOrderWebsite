const mongoose = require("mongoose");
const { FoodItem } = require("./foodmodel");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    foodItems: [{
        foodItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodItem",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    }
});

cartSchema.methods.calculateTotalPrice = function() {
    this.totalPrice = this.foodItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0
    );
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
