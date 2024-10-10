const jwt = require("jsonwebtoken");

const adminauth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        // Log the authorization header to debug
        console.log("Authorization Header:", authHeader);

        // Check if the Authorization header exists
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Authorization header missing" });
        }

        // Remove 'Bearer ' and trim any extra spaces
        const token = authHeader.replace('Bearer ', '').trim();

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing from Authorization header" });
        }

        // Verify the token
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Check if the user has an admin role
        if (tokenVerified.role !== "admin") {
            return res.status(403).json({ success: false, message: "User not authorized" });
        }

        // Pass the token data to the request object
        req.user = tokenVerified;

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error("Error verifying JWT:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ success: false, message: "Invalid token" });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

module.exports = { adminauth };
