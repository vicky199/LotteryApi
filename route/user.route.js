const express = require("express");
const router = express.Router();
const UserController=require("../controllers/user.controller")
const userController=new UserController();

router.get("/getUsers",userController.getUsers);

module.exports=router;