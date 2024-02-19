const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto=require('crypto');
// resetPassToken
exports.resetPassToken = async (req, res) => {
    try {
        // get email
        const email = req.body.email;
        // check user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "during reset pass email is invalid user not exist",
            })
        }

        const token = crypto.randomUUID();
        // upate user by adding expiry time

        const updateDetail = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 60 * 1000,
            },
            { new: true },
        )

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail
        await mailSender(
            email,
            "Password Reset Link",
            `Password Reset Link: ${url}`
        )

        return res.status(200).json({
            success: true,
            message: "email sent successfully check email and reset password",
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "error occur while reset password",
        })
    }


}
// resetPass

exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // validation
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "password doesnot match in reset Password",
            })
        };
        // get user detail
        const userDetails = await User.findOne({ token: token });
        // toke time check
        if (!(userDetails.resetPasswordExpires > Date.now())) {    // check again
            return res.status(401).json({
                success: false,
                message: "token expires in reset Password",
            })
        }
        // hash Password 
        const hashPassword = await bcrypt.hash(password, 10);
        // password update
        await User.findOneAndUpdate(
            {token:token},
            { password: hashPassword },
            { new: true }
        );

        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        })
    } catch (err) {
        return res.status(401).json({
            success:false,
            message:"error occur during reset password",
        })
    }
}