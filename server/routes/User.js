const express = require("express");
const router = express.Router();

const { login, signUp, sendOtp, changePassword } = require("../controllers/Auth");
const {auth}=require("../middlewares/auth");

const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");

router.post("/login",login);
router.post("/signUp",signUp);
router.post("/sendOtp",sendOtp);
router.post("/changePassword",auth,changePassword);

router.post("/reset-password-token",resetPasswordToken);
router.post("/resetPassword",resetPassword);

module.exports=router;