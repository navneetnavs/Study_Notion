const SubSection = require("../models/SubSection");
const uploadVideoToCloudinary = require("../utils/imageUploader");
const Section = require("../models/Section");
require("dotenv").config();
exports.createSubsection = async (req, res) => {
    try {
        const { sectionId, title,  description } = req.body;

        const video = req.files.video;
        console.log('sectionId', sectionId);
        console.log('title', title);

        console.log('description', description);
        console.log('video', video);
        
         

        if (!video || !title || !sectionId || !description) {
            return res.status(400).json({
                success: false,
                message: "All fleid are required."
            })
        }

        const uploadDetails = await uploadVideoToCloudinary(video, process.env.FOLDER_NAME);
        console.log('uploadDetails',uploadDetails);
        
        const newSubSection = await SubSection.create({
            title,
            timeDuration:`${uploadDetails.duration}`,
            description,
            videoUrl: uploadDetails.secure_url
        });
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            { $push: { subSection: newSubSection._id } },
            { new: true }).populate("subSection");
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully.",
            data: updatedSection
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to create subsection.please try again",
            error: error.message
        })
    }
}
exports.updateSubsection = async (req, res) => {
    try {
        const { title, description, subSectionId, sectionId } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }
        if (title != undefined) {
            subSection.title = title
        }
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {

            const video = req.files.video;
            const uploadDetails = await uploadVideoToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save()


        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )


        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully.",
            data: updatedSection
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to update subsection.please try again",
            error: error.message
        })
    }
}

exports.deleteSubsection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        console.log('subSectionId', subSectionId);
        console.log('sectionId', sectionId);


        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });
        console.log('subSection', subSection);


        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection")
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "subsection deleted successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to delete subsection.please try again",
            error: error.message
        })
    }
}