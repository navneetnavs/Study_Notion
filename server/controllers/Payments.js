const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const crypto=require("crypto")
const mongooose = require("mongoose");
const mailSender = require("../utils/mailSender");
const CourseProgress = require("../models/CourseProgess")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;
    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide Course ID"
        })
    }
    let total_amount = 0;
    for (const course_id of courses) {
        let course
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({ success: false, message: "could not find the course" })
            }
            const uid = new mongooose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already enrolled." })
            }
            total_amount += course.price;
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),

    }
    try {
        const paymentResponse = await instance.orders.create(options)
        console.log('paymentResponse...', paymentResponse);
        res.json({
            success: true,
            data: paymentResponse
        })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "Could not initiate order." })
    }
}
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses;
    const userId = req.user.id;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        })

    }
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex")
    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res);
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }
    return res.status(200).json({ success: false, message: "Payment Failed" })
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount) {
        return res.status(400).json({
            success: false,
            message: "Please provide all details"
        })
    }
    try {
        const enrollStudents = await User.findById(userId)
        console.log('enrollStudents..................',enrollStudents);
        
        await mailSender(enrollStudents.email, "Payment Received", paymentSuccessEmail(`${enrollStudents.firstName} ${enrollStudents.lastName}`, amount / 100, orderId, paymentId))
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId }, {
                $push: { studentsEnrolled: userId },
            },
                { new: true }
            );
            if (!enrolledCourse) {
                return res
                    .status(500)
                    .json({ success: false, error: "Course not found" })
            }
            console.log("Updated course: ", enrolledCourse)
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId, completedVideos: []
            })
            const enrolledStudents = await User.findOneAndUpdate({_id:userId}, {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id
                },
            }, { new: true })
            console.log('Enrolled students', enrolledStudents);
            console.log('11111111');
            
            const emailResponse = await mailSender(enrolledStudents.email,
                 `Successfully Enrolled into ${enrolledCourse.courseName}`, courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudents.firstName} ${enrolledStudents.lastName}`))
            console.log('2222222222222');
            
                 
                 
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}