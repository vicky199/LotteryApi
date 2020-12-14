const express = require("express");
const router = express.Router();
const LotteryController=require("../controllers/lottery.controller")
const lotteryController=new LotteryController();

router.get("/getLotteryNumber",lotteryController.getLotteryNumber);
router.post("/addLotteryNumber",lotteryController.addLotteryNumber);
router.post("/displayResult",lotteryController.displayResult);
module.exports=router;