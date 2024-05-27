const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,

    },
    courseDescription: {
        type: String,

    },
    whatWillYouLearn: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    price: {
        type: Number,

    },
    thumbnail: {
        type: String,
    },
    courseContent: [
    {
        type: mongoose.Schema.Types.ObjectId,
          ref:"Section"
    }
],
    reviewAndRating:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"ReviewAndRating"
        }
    ],
    studentsEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
             ref:"User"
        }
    ],
    tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Course", courseSchema);
