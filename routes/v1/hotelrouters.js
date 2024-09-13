const express = require('express');
const { getallhotels, gethotelbyid, createhotel, updatehotels } = require('../../controller/hotelcontrollers.js');
const { upload } = require("../../middlewares/multer.js");
const { adminauth } = require('../../middlewares/adminauth.js');

const router = express.Router();

router.post('/createhotel', upload.single("image"), adminauth, createhotel);
router.get('/hotels', getallhotels);
router.get('/hotelprofile/:id', gethotelbyid);
router.put('/update/:id', upload.single("image"), adminauth, updatehotels);

module.exports = { hotelrouters: router };
