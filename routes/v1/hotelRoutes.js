const express = require('express');
const {
    hotelSignup,
    hotelLogin,
    hotelLogout,
    hotelProfile,
    checkHotel
} = require('../../controller/hotelControllers');
const { hotelAuth } = require('../../middlewares/hotelAuth');
const router = express.Router();


router.post("/signup", hotelSignup); 
router.post("/login", hotelLogin);
router.post("/logout", hotelLogout);  

router.get("/profile", hotelAuth, hotelProfile);  
router.get("/check.hotel", hotelAuth, checkHotel); 


router.put("/update");  
router.delete("/delete");  
router.get("/hotelList");  

module.exports = { hotelRouter: router };
