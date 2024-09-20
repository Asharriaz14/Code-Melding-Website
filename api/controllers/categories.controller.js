import { errorHandler} from "../utils/error.js";
import Category from '../models/categories.model.js';

export const create = async (req, res , next) => {

    if(!req.body.categoryName) {
        return next(errorHandler(400, "Please Enter the category name"));
    }

    const categoryName = req.body.categoryName.toLowerCase();

    const newCategory = new Category({
        name: categoryName
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        next(error);
    }
}


export const getcategories = async (req, res, next) => {
    // console.log("Request received");
    try {
        const { categoryId } = req.params;
        // console.log('caa' ,categoryId); // Get the categoryId from the request parameters

        if (categoryId) {
            // Fetch a specific category by id
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json(category); // Send the specific category as a JSON response
        } else {
            // Fetch all categories if no id is provided
            const categories = await Category.find().sort({ name: 1 }); // Sort alphabetically by name
            return res.status(200).json(categories); // Send the categories as a JSON response
        }
    } catch (error) {
        next(error); // Forward any errors to the error handler middleware
    }
};

export const deletecategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if(!category) {
            return next (errorHandler(404, 'Category not found'));
        }
        await Category.findByIdAndDelete(req.params.categoryId);
        res.status(200).json('Category has been deleted');
    }
    catch (error) {
        next(error)
    }
}

export const updatecategory = async (req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryId,
            {
                $set: {
                    name: req.body.name
                }
            },
            { new: true }
        );

        if (!updatedCategory) {
            return next(errorHandler(404, 'Category not found'));
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
};
