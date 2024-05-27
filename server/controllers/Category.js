const Category = require("../models/Category");

function getRandomInt(max) {
	return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({
				success: false,
				message: "All fields are required."
			})
		}
		const categorysDetails = await Category.create({
			name,
			description
		})
		// console.log(categorysDetails);

		return res.status(200).json({
			success: true,
			message: "Category created successfully."
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message
		})

	}
}
exports.showAllCategories = async (req, res) => {
	try {
		const allCategories = await Category.find({}, { name: true, description: true });
		console.log('allCategories....',allCategories);
		
		res.status(200).json({
			success: true,
			message: "All tags returned successfully",
			data: allCategories
		})
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
			data: allCategories
		})
	}
};
exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;
           console.log('categoryId..',categoryId);
		   
		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId).populate({
			path:"courses",
			match :{status:"Published"},
			populate:"reviewAndRating"
		}).exec()
			
		console.log("selectedCategory...",selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}



		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		})
		let differentCategory = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id).populate({
			path: "courses",
			match: { status: "Published" },
		}).exec()

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate({
			path: "courses",
			match: { status: "Published" },
		}).exec()
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategory,
				mostSellingCourses
			}
			
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}