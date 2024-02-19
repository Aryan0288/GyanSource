const Tag=require('../models/Tags');


// create tag handler

exports.createTag=async(req,res)=>{
    try{
        const {name,description}=req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"all field are required",
            })
        }

        const tagDetail=await Tag.create({
            name:name,
            description:description,
        })

        return res.status(200).json({
            success:true,
            message:"tag are successfully added",
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"error occur during tag added",
        })
    }
}

// get All tagDetail

exports.showAllTags=async(req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"all tags are fetched successfully",
            allTags,
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"erro occur during fetch all tags",

        })
    }
}