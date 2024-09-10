const express = require('express');
const { userRouter } = require('./userRoutes');
const { hotelRouter } = require('./hotelRoutes');
const { foodRouter } = require('./foodRoutes');
const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/hotel", hotelRouter);
v1Router.use("/food", foodRouter)

module.exports = {v1Router}