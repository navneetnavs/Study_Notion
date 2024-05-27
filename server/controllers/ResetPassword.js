const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto=require("crypto");
exports.resetPasswordToken = async (req, res) => {

    try {
        const { email } = req.body;

        const checkEmail = await User.findOne({ email });
        if (!checkEmail) {
            return res.status(403).json({
                success: false,
                message: "Your email is not register with us."
            })
        }
        const token = crypto.randomBytes(20).toString("hex");
        console.log(token);
        
        const updatedDetails = await User.findOneAndUpdate({ email: email }, {
            token,
            resetPasswordExpires: Date.now() + 3600000
        },
            { new: true }
        )
        let url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email, "Password Reset L", `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        return res.status(200).json({
            success: true,
            message: "Email send successfully. please check email and change pwd"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while send email to change pwd."
        })
    }

}
exports.resetPassword = async (req, res) => {

    try {
        const { password, confirmPassword, token } = req.body;
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password not matched."
            })
        }
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.status(403).json({
                success: true,
                message: "token are invalid."
            })
        }
        if (!(userDetails.resetPasswordExpires  > Date.now())) {
            return res.json({
                success: false,
                message: "token expires, please regenerate token."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token }, {
            password: hashedPassword
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset pwd mail."
        })
    }



}