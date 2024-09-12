const express = require('express');
const { getallhotels,gethotelbyid, createhotel, updatehotels } = require('../../controller/hotelcontrollers.js');
const { Hotel } = require('../../models/hotelmodel.js');
const router=express.Router();
const {upload}=require("../../middlewares/multer.js")
const {adminauth}=require('../../middlewares/adminauth.js')


router.post('/createhotel',upload.single("image"),adminauth,createhotel)
router.get('/hotels',getallhotels)
router.get('/hotelprofile/:id',gethotelbyid)

router.post('/update:id',upload.single("image"),adminauth,updatehotels)

module.exports={hotelrouters:router}