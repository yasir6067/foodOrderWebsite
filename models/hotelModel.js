const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    website: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    cuisineType: [String],
    openingHours: {
        open: String,
        close: String,
    },
    fooditems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem'
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
    image: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Hotel = mongoose.model('Hotel', hotelschema);

module.exports = { Hotel };
