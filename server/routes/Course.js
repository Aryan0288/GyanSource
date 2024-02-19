const express = require('express');
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
} = require('../controllers/Course');

const {
    showAllCategories,
    createCategory,
    categoryPageDetail
} = require('../controllers/category');

const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/Sections');

const {
    createSubSection,
    updatesubSection,
    deleteSubSection
} = require('../controllers/subSection');


const {
    createRating,
    getAverageRating,
    getAllRating
} = require('../controllers/RatingAndReview');


const {
    auth,
    isInstructor,
    isStudent,
    isAdmin
} = require('../middleware/auth');

const {updateCourseProgress}=require('../controllers/courseProgress');
// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse", auth, isInstructor, createCourse);
// add a section
router.post("/addSection", auth, isInstructor, createSection);
// update Section
router.post("/updateSection", auth, isInstructor, updateSection);
// delete section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// add a subSection
router.post("/addSubSection", auth, isInstructor, createSubSection);
// edit subsection
router.post("/updateSubSection", auth, isInstructor, updatesubSection);
// delete subsection
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// get All registered courses
router.get("/getAllCourses", getAllCourses);
// get detail for specified course
router.post("/getCourseDetails", getCourseDetails);
// get full course detail
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
// edit course detail
router.post("/editCourse",auth,isInstructor, editCourse);
// get instruction
router.get('/getInstructorCourses',auth,isInstructor ,getInstructorCourses);
// Delete a course
router.delete("/deleteCourse",deleteCourse)
// update course progress
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

// category router written here
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/showAllCategories",categoryPageDetail);


// rating router
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router






