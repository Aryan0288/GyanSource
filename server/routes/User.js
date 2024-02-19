const express=require('express');
const router=express.Router();

// const {
//     login,
//     signUp,
//     sendOTP,
//     changePassword,
// }=require('../controllers/Auth');
const {
    login,
    signup,
    sendotp,
    changePassword
}=require('../controllers/Auth')

const {resetPassToken,resetPassword} =require('../controllers/resetPass');

const {auth}=require('../middleware/auth');

// route for the user login

// router.post("/login", login);
// router.post("/signup", signUp);
// router.post("/sendotp", sendOTP);

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);

router.post("/changePassword",auth, changePassword);
router.post("/reset-password-token",resetPassToken);
router.post("/reset-password",resetPassword);


module.exports=router

