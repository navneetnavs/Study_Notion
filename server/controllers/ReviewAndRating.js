const ReviewAndRating = require("../models/ReviewAndRating");
const Course = require("../models/Course");
const mongoose = require("mongoose");
exports.createRating = async (req, res) => {
    try {

        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        console.log('userId',userId,"rating",rating,"review",review,"courseId",courseId);
        
        const courseDetails = await Course.findOne(
            {
              _id:  courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course.",
            })
        }
        const alreadyReviewed = await ReviewAndRating.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by user."
            })
        }
        const newReviewAndRating = await ReviewAndRating.create({
            review,
            rating,
            course: courseId,
            user: userId
        });
         await Course.findByIdAndUpdate({ _id: courseId },
            { $push: { reviewAndRating: newReviewAndRating} },
            );
         await courseDetails.save()
        return res.status(200).json({
            success: true,
            message: "Review and Rating created successfully.",
            newReviewAndRating
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })


    }
}
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const result = await ReviewAndRating.aggregate([{
            $match: { course: new mongoose.Types.ObjectId(courseId) }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" }
            }
        }

        ])
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }
        return res.status(200).json({
            success: true,
            averageRating: 0
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
exports.getAllRating = async (req, res) => {
    try {

        const allReview = await ReviewAndRating.find({}).sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            }).populate(
                {
                    path: "course",
                    select: "courseName"
                }
            ).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReview,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}