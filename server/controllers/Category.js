const Category = require('../models/category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// createCategory
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategorysDetails);
        return res.status(200).json({
            success: true,
            message: "Categorys Created Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }
};



// show All Category
exports.showAllCategories = async (req, res) => {
    try {
        console.log("INSIDE SHOW ALL CATEGORIES");
        const allCategorys = await Category.find({});
        res.status(200).json({
            success: true,
            data: allCategorys,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 
exports.categoryPageDetail = async (req, res) => {
    try {
        // get categoryId
        const { categoryId } = req.body;
        // get courses for specified category
        const selectedCategory = await Category.findById(categoryId)
                                .populate({
                                    path:"course",
                                    match:{status:"Published"},
                                    populate:"ratingAndReviews"
                                })
                                .exec()

        // validation
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "selectedCategory empty",
            })
        }

        const categoriesExceptSelected = await Category.find({
                _id: { $ne: categoryId },
        });

        let differentCategory=await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path:"courses",
            match:{status:"Published"},
        })
        .exec();
        // top selling courses       //H.w
        const allCategories=await Category.find()
                                          .populate({
                                            path:"courses",
                                            match:{status:"Published"},
                                            populate:{
                                                path:"instructor",
                                            }
                                          })
                                          .exec();

        const allCourses=allCategories.flatMap((category)=>category.courses);

        const moreSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);


        // return res
        return res.status(200).json({
            success: true,
            message: "categoryPageDetail successfully ",
            data: {
                selectedCategory,
                differentCategory,
                moreSellingCourses
            }
        });

    } catch (err) {
        console.log(err.message);
        return res.status(400).json({
            success: false,
            message: "error occur while get categoryPageDetail",
        })
    }
}
