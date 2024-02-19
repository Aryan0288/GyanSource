const Section=require('../models/Section');
const SubSection = require('../models/SubSection');
const Course=require('../models/course');

exports.createSection=async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:true,
                message:"fill all fields",
            })
        }

        const newSection=await Section.create({sectionName});   
        console.log("continue")
        // update course with section objectid
        const updateCourse=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message:"create Section successfully",
            updateCourse,
        })

    }catch(err){
        return res.status(400).json({
            success:true,
            message:"error occur during create Section",
        })
    }
}


exports.updateSection=async(req,res)=>{
    try{
        // fetch data
        const {sectionName,sectionId}=req.body;
        // validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:true,
                message:"fill all fields",
            })
        }
        // update data
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        // return res
        return res.status(200).json({
            success:true,
            message:"Section update Section",
        })


    }catch(err){
        return res.status(400).json({
            success:true,
            message:"error occur during update Section",
        })
    }
}

// delete section
exports.deleteSection=async(req,res)=>{
    try{
        
        const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});

    }catch(err){
        return res.status(400).json({
            success:true,
            message:"error occur during delete Section",
        })
    }
}