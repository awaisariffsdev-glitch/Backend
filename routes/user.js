const express = require("express");
const { userSignUp, userLogIn } = require("../controller/user.controller");
const {adminCheck}=require("../controller/admin.controller");
const upload = require("../middleware/uploads");
const router=express.Router();


router.post("/signUp",upload.single("image"),userSignUp);
router.post("/register",upload.single("image"),userSignUp);
router.post("/check",adminCheck);
router.post("/logIn",userLogIn);


module.exports=router;