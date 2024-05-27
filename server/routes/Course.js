const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseDetails,editCourse,getInstructorCourses,
getFullCourseDetails, 
deleteCourse} = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubsection, updateSubsection, deleteSubsection } = require("../controllers/Subsection");
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { createRating, getAverageRating, getAllRating } = require("../controllers/ReviewAndRating");
const {updateCourseProgress}=require("../controllers/CourseProgress")

    //    Course routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/createSubsection",auth,isInstructor,createSubsection);
router.post("/updateSubsection",auth,isInstructor,updateSubsection);
router.post("/deleteSubsection",auth,isInstructor,deleteSubsection);

router.get("/getAllCourses",getAllCourses);
router.post("/getCourseDetails",getCourseDetails);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);

router.delete("/deleteCourse",deleteCourse)
router.post('/editCourse',auth,isInstructor,editCourse);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
    //   Category routes only for admin
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);


//   Rating and Review
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating);

// to update course progress
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)
module.exports=router;