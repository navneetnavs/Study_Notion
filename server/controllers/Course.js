const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require('../models/SubSection');
const { convertSecToDuration } = require('../utils/secToDuration');
const CourseProgess = require("../models/CourseProgess");
require("dotenv").config();
exports.createCourse = async (req, res) => {
    try {

        let { courseName
            , courseDescription,
            whatWillYouLearn,
            price, category, tag, status, instructions } = req.body;
        console.log("req.body......", req.body);

        const thumbnail = req.files.thumbnailImages;
        console.log('thumbnail', thumbnail);
        if (!courseName || !courseDescription || !whatWillYouLearn || !price || !category || !thumbnail || !tag.length) {
            return res.status(400).json({
                success: false,
                message: "All fields are required............."
            })
        }

        const userId = req.user.id;

        if (!status || status === undefined) {
            status = "Draft";
        }
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "instructor not found."
            })
        }
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatWillYouLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            instructor: instructorDetails._id,
            status: status,
            thumbnail: thumbnailImage.secure_url,
            instructions
        });

        await User.findByIdAndUpdate({ _id: instructorDetails._id },

            {
                $push: { courses: newCourse._id }
            },
            { new: true });

        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "course created successfully.",
            data: newCourse
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Course',
            error: error.message,
        })
    }

}

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find({},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }).populate("instructor")
            .exec();;

        return res.status(200).json({
            success: true,
            message: "All data are fetching successfully.",
            data: courses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data."

        })
    }
}
exports.getCourseDetails = async (req, res) => {
    try {
       
        
        const { courseId } = req.body;
        console.log('courseId..............',courseId);
        const courseDetails=await Course.findById(courseId).populate("instructor").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
               
            }
    }).populate("reviewAndRating").exec()
        // const courseDetails = await Course.findOne({ _id: courseId }).populate({
        //     path: "instructor",
        //     populate: {
        //         path: "additionalDetails"
        //     }
        // }).populate("category").populate("reviewAndRating").populate({
        //     path: "courseContent",
        //     populate: {
        //         path: "subSection",
        //         select: "-videoUrl",
        //     }
        // }).exec();
        if (!courseDetails) {
         return   res.status(400).json({
                success: false,
                message: `could not find the course with ${courseId} `
            })
        }
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
         console.log('totalDuration',totalDurationInSeconds);
         
        const totalDuration = convertSecToDuration(totalDurationInSeconds) 

         res.status(200).json({
            success: true,
            message: "course detail fetched successfully.",
            data: {
                courseDetails,
                totalDuration
            }
         
        })
    } catch (error) {
        console.log(error);
      return   res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found." })
        }
        if (req.files) {
            console.log('thumbnail update');
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;

        }
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (course[key] === 'tag' || course[key] === 'instructions') {
                    course[key] = JSON.parse(updates[key]);
                }
                else {
                    course[key] = updates[key];
                }
            }
        }
        await course.save();
        const updatedCourse = await Course.findOne({ _id: courseId }).populate({
            path: "instructor", populate: {
                path: 'additionalDetails'
            }
        }).populate('category').populate('reviewAndRating').populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();
        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        console.log('userId.........', userId);

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("reviewAndRating")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        console.log('course.......', courseDetails);

        const courseProgressCount = await CourseProgess.findOne({ courseId, userId });
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        };

        let totalDurationInSecond = 0;
        courseDetails.courseContent.forEach((courseContent) => {
            courseContent.subSection.forEach((subSection) => {
                const timeDurations = parseInt(subSection.timeDuration);
                totalDurationInSecond += timeDurations;
            })

        })
        const totalDuration = convertSecToDuration(totalDurationInSecond);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        
        
        const enrolledStudent = course.studentsEnrolled;
        
        for (const studentId of enrolledStudent) {
            await User.findByIdAndUpdate({ _id: studentId }, {
                $pull: { courses: courseId }
            })
        }
        const courseSection = course.courseContent;
        
        
        for (const sectionId of courseSection) {
            const section = await Section.findById(sectionId);
           
            
            if (section) {
                const subSections = section.subSection;
                
                
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}