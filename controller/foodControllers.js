const { FoodItem } = require("../models/foodModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token"); 


const addFoodItem = async (req, res, next) => {
    try {
        const { name, description, price, category, image } = req.body;


        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required"
            });
        }

    
        const newFoodItem = new FoodItem({
            name,
            description,
            price,
            category,
            image,
        });

        
        await newFoodItem.save();
        res.json({
            success: true,
            message: "Food item added successfully",
            data: newFoodItem
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};


const getFoodItems = async (req, res, next) => {
    try {
        
        const foodItems = await FoodItem.find().populate('category');
        res.json({
            success: true,
            message: "Food items fetched successfully",
            data: foodItems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Update a food item
const updateFoodItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Update the food item by ID
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedFoodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        res.json({
            success: true,
            message: "Food item updated successfully",
            data: updatedFoodItem
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Delete a food item
const deleteFoodItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete the food item by ID
        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);

        if (!deletedFoodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        res.json({
            success: true,
            message: "Food item deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Check food availability
const checkFoodAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foodItem = await FoodItem.findById(id);

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        const isAvailable = foodItem.availability;
        res.json({
            success: true,
            message: `Food item is ${isAvailable ? 'available' : 'not available'}`,
            availability: isAvailable
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = {
    addFoodItem,
    getFoodItems,
    updateFoodItem,
    deleteFoodItem,
    checkFoodAvailability
};
