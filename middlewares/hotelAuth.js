const jwt = require("jsonwebtoken");

const hotelAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "Hotel not authorized" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.hotel = tokenVerified; 
        next(); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = { hotelAuth };
