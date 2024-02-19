const { instance } = require('../config/razorpay');
const Course = require('../models/course');
const crypto = require('crypto')
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress=require('../models/CourseProgress');




exports.capturePayment = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.user.id;
        // valid courseDetail
        if (!course_id) {
            return res.status(401).json({
                success: false,
                message: "please provide valid course id",
            })
        }

        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(401).json({
                    success: false,
                    message: "could not find course",
                })
            }

            // user already pay
            const uid = new mongoose.Types.ObjectId(userId);

            if (!course.studentsEnrolled.includes(uid)) {
                return res.status(401).json({
                    success: false,
                    message: "user already buy this course",
                })
            }
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "error occur during capture payments",
            })
        }


        // order create
        const amount = course.price;
        const currency = "INR";

        const option = {
            amount: amount * 100,
            currency,
            reciept: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId,
            }
        };

        try {
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.currency,
                message: "payment successfully created",

            })
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "could not initiate order",
            })
        }
        // return res



    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "error occur while create the payments",
        })
    }
}

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    // convert secure string
    crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorized");

        const { courseId, userId } = req.body.payload.payment.entity.notes;


        try {
            // full fill the action
            const enrollCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            )

            if (!enrollCourse) {
                return res.status(401).json({
                    success: false,
                    message: "Course not found",
                })
            }

            console.log(enrollCourse);

            // find student and student list of enroll courses
            const enrollStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true },
            );

            console.log(enrollStudent);

            // mail send confirmation
            const emailResponse = await mailSender(
                enrollStudent.email,
                "Congratulation from gyanSource",
                "Congratulation, you are onboard into new gyanSource Course"
            );

            return res.status(200).json({
                success: true,
                message: "Course buy successfully",
            })

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "erro occur during course buy",
            })
        }
    }
    else {
        return res.status(401).json({
            success: false,
            message: "signature not match",
        })
    }
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all the details" })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for (const courseId of courses) {
        try {
            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnroled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res
                    .status(500)
                    .json({ success: false, error: "Course not found" })
            }
            console.log("Updated course: ", enrolledCourse)

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })
            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            )

            console.log("Enrolled student: ", enrolledStudent)
            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )

            console.log("Email sent successfully: ", emailResponse.response)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}