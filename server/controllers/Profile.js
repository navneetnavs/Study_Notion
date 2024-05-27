const Profile = require("../models/Profile");
const User = require("../models/User");
const imageUploaderToCloudinary = require("../utils/imageUploader");
const {convertSecToDuration}=require("../utils/secToDuration")
const mongoose=require("mongoose")
const Course=require("../models/Course")
const CourseProgress=require("../models/CourseProgess")
require("dotenv").config();
exports.updateProfile = async (req, res) => {

    try {
        const { dateOfBirth = "", gender = "", about = "", contactNumber } = req.body;
        const id = req.user.id;
        if (!gender || !contactNumber || !id) {
            return res.status(400).json({
                success: false,
                message: "Missing properties."
            })
        }
        const userDetails = await User.findById(id);

        const profile = await Profile.findById(userDetails.additionalDetails);

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();
        const updatedDetails = await User.findById(id).populate('additionalDetails');



        return res.status(200).json({
            success: true,
            message: "Profile data updated successfully.",
            updatedDetails

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to update profile data.please try again.",
            error: error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        console.log('id h');

        const userDetails = await User.findById({ _id: id });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({ _id: profileId });
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to delete user",
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // console.log(userDetails);

        return res.status(200).json({
            success: true,
            message: "user details fetched successfully.",
            data: userDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const id = req.user.id;
        console.log("id == " + id);

        const displayPicture = req.files.displayPicture;
        console.log("display picture file " + displayPicture);

        const image = await imageUploaderToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log("image to cloudinary " + image.secure_url);

        const updateProfile = await User.findByIdAndUpdate({ _id: id }, {
            image: image.secure_url
        }, { new: true }).populate('additionalDetails');
        console.log(updateProfile);
        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updateProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while update profile picture",
        })
    }
}

exports.getEnrolledCourse = async (req, res) => {
    try {
        const userId = req.user.id;


        let userDetails = await User.findOne({ _id: userId }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }
        }).exec()

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
              userDetails.courses[i].totalDuration= convertSecToDuration(totalDurationInSeconds)
              SubsectionLength+= userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount=await CourseProgress.findOne({
                courseId:userDetails.courses[i]._id,
                userId:userId
            })
            courseProgressCount=courseProgressCount?.completedVideos.length
            if(SubsectionLength ===0){
                userDetails.courses[i].progressPercentage =100
            }
            else{
                const multiplier=Math.pow(10,2)
                userDetails.courses[i].progressPercentage= Math.round(
                    (courseProgressCount/SubsectionLength)*100 * multiplier
                )/multiplier
            }
        }
        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard=async (req,res)=>{
    try {
        const courseDetails=await Course.find({
            instructor:req.user.id
        })
        const courseData=courseDetails.map((course)=>{
            const totalStudentsEnrolled=course.studentsEnrolled.length
            
        const totalAmountGenerated=totalStudentsEnrolled*course.price
         

        const courseDataWithStats={
            _id:course._id,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            totalStudentsEnrolled,
            totalAmountGenerated
        }
        console.log(courseDataWithStats,"starts")
        return courseDataWithStats
        })
        res.status(200).json({courses:courseData})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}