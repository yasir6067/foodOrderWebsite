const { Hotel } = require("../models/hotelModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");


const hotelSignup = async (req, res, next) => {
    try {
        const { name, email, password, phone, profilePic, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const isHotelExist = await Hotel.findOne({ email });
        if (isHotelExist) {
            return res.status(400).json({
                success: false,
                message: "Hotel already exists"
            });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newHotel = new Hotel({
            name,
            email,
            password: hashedPassword,
            phone,
            profilePic,
            address
        });

        await newHotel.save();
        const token = generateToken(newHotel._id);

        res.cookie('token', token);
        res.json({
            success: true,
            message: "Hotel created successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Hotel Login
const hotelLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hotel = await Hotel.findOne({ email });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        const passwordMatch = bcrypt.compareSync(password, hotel.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(hotel._id);
        res.cookie("token", token);
        res.json({
            success: true,
            message: "Hotel login successful"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Hotel Logout
const hotelLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "Hotel logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Fetch Hotel Profile
const hotelProfile = async (req, res, next) => {
    try {
        const { hotel } = req;
        const hotelData = await Hotel.findOne({ _id: hotel.id });
        res.json({ success: true, message: "Hotel data fetched", data: hotelData });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Check Hotel Authorization
const checkHotel = async (req, res, next) => {
    try {
        const { hotel } = req;
        if (!hotel) {
            return res.status(401).json({ success: false, message: "Hotel not authorized" });
        }
        res.json({ success: true, message: "Hotel authorized" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = { hotelSignup, hotelLogin, hotelLogout, hotelProfile, checkHotel };
