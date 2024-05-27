const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection=require("../models/SubSection")
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        
        
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties."
            })
        }
        const newSection = await Section.create({ sectionName });
        const updatedCourseDetail = await Course.findByIdAndUpdate( courseId , {
            $push: { courseContent: newSection._id }
        },
            { new: true }).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        return res.status(200).json({
            success: true,
            message: "Course section is created successfully.",
            updatedCourseDetail
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating course section.",
        
        })
    }
}
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId ,courseId } = req.body;
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties."
            })
        }
        const updateSection = await Section.findByIdAndUpdate( sectionId , 
             { sectionName }
        ,
            { new: true });

            const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();   
          return res.status(200).json({
            success:true,
            message:"Section updated successfully.",
            data:course
          }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
}

exports.deleteSection=async (req,res)=>{
    try {
        const {sectionId,courseId}=req.body;
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId
            }
        })
        const section=await Section.findById(sectionId);
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        await SubSection.deleteMany({_id: {$in: section.subSection}});
        await Section.findOneAndDelete(sectionId);
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
         res.status(200).json({
            success:true,
            message:"section deleted successfully.",
            data:course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete section. please try again"
        })
    }
}