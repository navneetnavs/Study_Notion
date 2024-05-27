const User = require("../models/User");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        console.log('token in auth file '+ token);
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing."
            })
        }
        try {

            console.log("before decode");
            const decode =  Jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decode;
            console.log("decode.....",decode)
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid."
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating  the token."
        })
    }
}
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Student only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not verified. Please try again."
        })
    }
}
exports.isInstructor = async (req, res, next) => {
    try {
        console.log("req ka data"+ req.user.accountType )
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not verified. Please try again."
        })
    }
}
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only."
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not verified. Please try again."
        })
    }
}
