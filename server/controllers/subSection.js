const SubSection = require('../models/SubSection');
const Section=require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const { findByIdAndUpdate } = require('../models/User');

exports.createSubSection =async(req,res)=>{
    try{
        // fetch data
        const{sectionId,title,timeDuration,description} =req.body;
        // extract files
        const video=req.files.video;
        console.log("video",video);
        // validate
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"fill all fields",
            })
        }
        // upload cloudinary
        const uploadCloudinary=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        // create a subsection
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadCloudinary.secure_url,
        })
        // update section
        const updatesubSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true},
        )
        // return res
        return res.status(200).json({
            success:true,
            message:"successfully create sub-Section",
            updatesubSection,
        })




    }catch(err){
        return res.status(400).json({
            success:false,
            message:"error occur during create Sub-Section",
        })
    }
}

// update subsection

exports.updatesubSection=async(req,res)=>{
    try{
        // const {sectionId,title,subSectionId,description}=req.body;
        // console.log("section id: ",sectionId)
        // if(!sectionId || !title || !description){
        //     return res.status(400).json({
        //         success:false,
        //         message:"fill all fields",
        //     })
        // }
        // const findSubSection=await SubSection.findById(subSectionId);
        // const updateSubSection=await SubSection.findByIdAndUpdate(subSectionId,
        //     {title,description},
        //     {new:true},
        // );
        
        
        
        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)
        console.log("subSection",subSection)
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
                )
                subSection.videoUrl = uploadDetails.secure_url
                subSection.timeDuration = `${uploadDetails.duration}`
            }
            
            await subSection.save()
            
            // find updated section and return it
            const updatedSection = await Section.findById(sectionId).populate(
                "subSection" 
                )
                
                return res.status(200).json({
                    success:true,
                    message:"successfully update subsection",
                    updatedSection,
                })
                
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"error occur during update subsection",
            err:err.message
        })
    }
}

// delete subsection

exports.deleteSubSection=async(req,res)=>{
    try{    
        const subSectionId=req.params;
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"subSectionId Not found",
            })
        }

        const deleteSubSectionDetails=await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"subSection successfully deleted"  ,
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"error occur during delete subsection",
        })
    }
}