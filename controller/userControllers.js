const { User } = require('../models/usermodel.js');
const bcrypt = require('bcrypt');
const { generatetoken } = require('../utils/token.js');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const usersignup = async (req, res, next) => {
    try {
        const { name, email, password, phone, profilepic, hotels } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const isUserExist = await user.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword);

        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            profilepic,
            hotels
        });

        const token = generatetoken(newUser._id);
        res.cookie('token', token);

        return res.status(201).json({ success: true, message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
};

const userlogin = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userexist = await user.findOne({ email });
        if (!userexist) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const passwordmatch = bcrypt.compareSync(password, userexist.password);
        if (!passwordmatch) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const token = generatetoken(userexist._id);
        res.cookie('token', token);

        return res.status(200).json({ success: true, message: "User logged in successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
};

const userlogout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.json({ message: "User logged out successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
};

const userprofile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userdata = await user.findById(id); 
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "User profile retrieved", data: userdata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

const checkuser = (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(401).json({ success: false, message: "User not authorized" });
        }
        res.json({ success: true, message: "User authorized" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "An error occurred", error: err.message });
    }
};

const userauth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "User not authorized, cookies not found" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "User not verified" });
        }

        req.user = tokenVerified;
        next(); 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { usersignup, userlogin, userlogout, userprofile, userauth, checkuser };
