const express = require("express");
const router = express.Router();
const { auth,isInstructor } = require("../middlewares/auth");
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourse,instructorDashboard } = require("../controllers/Profile");

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourse", auth, getEnrolledCourse);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard)
module.exports=router;