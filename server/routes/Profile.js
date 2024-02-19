const express=require('express');

const router=express.Router();
const {auth, isInstructor}=require('../middleware/auth');
const {
    updateProfile,
    deleteProfile,
    getAllfetchData,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard
}=require('../controllers/profile');



// Profile routers

router.delete("/deleteProfile",auth,deleteProfile);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllfetchData);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);

module.exports=router;