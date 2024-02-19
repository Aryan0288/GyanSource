const { default: mongoose } = require('mongoose');
const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/course');


// create rating
exports.createRating = async (req, res) => {
    try {
        // get userid, get data
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;
        // check user is enrolled
        const courseDetail = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            },
        )

        if (!courseDetail) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in this course and he/she can not be capable for give review",
            })
        }

        const alreadyReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })  
        console.log("alreadyReview : ",alreadyReview);

        if (alreadyReview) {
            return res.status(400).json({
                success: false,
                message: "you are not eligible for review again",
            })
        }
        // create review and rating
        const ratingReview = await RatingAndReview({
            rating,
            review,
            course: courseId,
            user: userId,
        })
        // update the course

        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }
        )
        console.log(updatedCourseDetails);
        // res return
        return res.status(200).json({
            success: true,
            message: "ratingAndReview successfully created",
            ratingReview,
        })


    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "error occur while creating review and rating",
            err:err.message
        })
    }
}

// average rating

exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        // calculate avg

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "rating" },
                }
            }
        ])

        //    rating exist
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
                message: "successfully find avg rating",
            })
        }

        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "Avg rating is 0,",
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "error occur while average rating",
        })
    }
}

// get all rating,

exports.getAllRating = async (req, res) => {
    try {
        const allReview = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();


        return res.status(400).json({
            success: true,
            message: "All review fetched successfully",
            data:allReview,
        })


    } catch (err) {
        return res.status(400).json({
            success:true,
            message:"error occur while get all fetch rating and review",
        })
    }
}