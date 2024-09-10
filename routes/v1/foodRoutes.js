const express = require('express');
const {
    addFoodItem,
    getFoodItems,
    updateFoodItem,
    deleteFoodItem,
    checkFoodAvailability
} = require('../../controller/foodControllers');
const { foodAuth } = require('../../middlewares/foodAuth');
const router = express.Router();

router.post("/add", foodAuth, addFoodItem);
router.get("/list", getFoodItems);                    
router.put("/update/:id", foodAuth, updateFoodItem);  
router.delete("/delete/:id", foodAuth, deleteFoodItem); 
router.get("/availability/:id", checkFoodAvailability); 

module.exports = { foodRouter: router };
