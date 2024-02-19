const express=require('express');
const router=express.Router();

const {auth,isStudent,isInstructor,isAdmin}=require('../middleware/auth');

const {capturePayment,verifySignature,sendPaymentSuccessEmail}=require('../controllers/Payments')

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);

module.exports=router

