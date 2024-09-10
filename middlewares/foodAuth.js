const jwt = require("jsonwebtoken");

const foodAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;  

        if (!token) {
            return res.status(401).json({ success: false, message: "User not authorized" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = tokenVerified; 
        next(); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = { foodAuth };
