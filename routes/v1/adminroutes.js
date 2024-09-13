const express = require("express");
const { adminSignup, adminLogout, adminLogin, adminProfile, checkadmin } = require("../../controller/admincontrollers");
const { adminauth } = require("../../middlewares/adminauth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.get("/profile/:id", adminauth, adminProfile); // Fixed route definition
router.put("/update", adminauth, (req, res) => {
    res.send("Admin update route");
});
router.delete("/delete", adminauth, (req, res) => {
    res.send("Admin delete route");
});

router.get("/userList", adminauth, (req, res) => {
    res.send("Admin user list route");
});

router.get("/check-admin", adminauth, checkadmin);

module.exports = { adminRouter: router };
