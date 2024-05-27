const mongoose=require("mongoose");

const courseProgess=new mongoose.Schema({
   courseId:
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }
   ,
   completedVideos:[
    {
        type: mongoose.Schema.Types.ObjectId,
         ref:"SubSection"
    }
   ]
})
module.exports= mongoose.model("CourseProgress",courseProgess);