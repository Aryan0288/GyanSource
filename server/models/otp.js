const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

// email send function

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from GyanSource",
            emailTemplate(otp),
        );
        console.log("email sent successfully ", mailResponse);
    } catch (err) {
        console.log("error occur while sending email", err);
    }
}

otpSchema.pre("save", async function (next) {
    console.log("We are otp schema function")
    await sendVerificationEmail(this.email, this.otp);
    next();
});


module.exports = mongoose.model("OTP", otpSchema);