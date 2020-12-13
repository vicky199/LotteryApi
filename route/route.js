const express = require("express");
const router = express.Router();
const userRoute= require("./user.route");
const lotteryRoute =require("./lottery.route");
//router.use("/user",userRoute)
router.use("/lottery",lotteryRoute)
module.exports=router;