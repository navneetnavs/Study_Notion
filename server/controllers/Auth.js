const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const generateOtp = require("otp-generator");
const mailSender = require("../utils/mailSender");

const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();
exports.signUp = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.send(403).json({
                success: false,
                message: "All field are required."
            })
        }
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "user already registered."
            })
        }
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password not matched."
            })
        }
        const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null

        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            success: true,
            message: "user registered successfully",
            data:user
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }


}
exports.login = async (req, res) => {

    try {
                console.log('aaaa');
                
        const { email, password } = req.body;
console.log('bbbbbbb');

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fleid are required, please try again."
            })
        }
    console.log('ccccccccccc');
    
        const user = await User.findOne({ email }).populate('additionalDetails');
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User is not register."
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "user LoggedIn successfully."
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "password incorrect."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }

}
exports.sendOtp = async (req, res) => {

    try {

        const { email } = req.body;
        console.log(email);
        
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "user already register."
            })
        }
        let otp = generateOtp.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log(otp);
        const result = await Otp.findOne({ otp: otp });
        while (result) {
            otp = generateOtp.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);
        console.log("otpBody ka data hai "+otpBody);
        

        return res.status(200).json({
            success: true,
            message: "Otp  sent successfully.",
            otp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while sending otp to email"
        })
    }


}

exports.changePassword = async (req, res) => {
    try {
        //get data from req body
        const userDetails = await User.findById(req.user.id);
        console.log('userDetails ... ', userDetails);
        
        //get oldPassword, newPassword, confirmNewPassowrd
        const { oldPassword, newPassword } = req.body;
       
        const isPasswordMatch = await bcrypt.compare(
        oldPassword,
            userDetails.password
        );
        console.log('isPasswordMatch ....', isPasswordMatch);
        
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }
        
       
        //update pwd in DB
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );

        // send mail - Password updated
        try {
           
            const emailResponse = await mailSender(
                updatedUserDetails.email,
              "Password Update Confirmation"  ,
                passwordUpdated(
                    updatedUserDetails.email,
                    `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log('after');
           /// console.log('response....',response);
            
            console.log("Email sent successfully:", emailResponse);
           
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully"  });
        //return response

    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}
