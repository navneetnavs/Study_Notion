const SubSection=require("../models/SubSection")
const CourseProgress=require("../models/CourseProgess")

exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id
    try {
        const subSection=await SubSection.findById(subSectionId)
        if(!subSection){
            return res.status(404).json({
                error:"Invalid subsection"
            })

        }
        const courseProgress=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course progress does not exist"
            })
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({ error: "Subsection already completed" })
            }
            courseProgress.completedVideos.push(subSectionId)
              
        }
         await courseProgress.save()
         
         return res.status(200).json({ message: "Course progress updated" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }

}