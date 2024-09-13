const { Admin } = require("../models/adminmodels");
const bcrypt = require("bcrypt");
const { generatetoken } = require("../utils/token");

const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }
        const isAdminExist = await Admin.findOne({ email });

        if (isAdminExist) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();

        const token = generatetoken(newAdmin._id, "admin");

        res.cookie("token", token, { httpOnly: true });
        res.json({ success: true, message: "Admin created successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const adminExist = await Admin.findOne({ email });
        if (!adminExist) {
            return res.status(404).json({ success: false, message: "Admin does not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, adminExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = generatetoken(adminExist._id, "admin");

        res.cookie("token", token, { httpOnly: true });
        res.json({ success: true, message: "Admin login successful" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

const adminProfile = async (req, res, next) => {
    try {
        const adminId = req.user._id;
        const adminData = await Admin.findById(adminId);

        if (!adminData) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        res.json({ success: true, message: "Admin profile retrieved", data: adminData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

const checkadmin = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(401).json({ success: false, message: "Admin not authorized" });
        }

        res.json({ success: true, message: "Admin authorized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

module.exports = { adminSignup, adminLogin, adminLogout, adminProfile, checkadmin };
