const { readAllCategory, readCategory, createCategory, updateCategory, deleteCategory} = require('../models/category.model')
const errorHandler = require('../helper/errorHandler.helper')

exports.getAllCategory = async (req, res) => {
    try {
        const category = await readAllCategory()
        res.status(200).json({
            success: true,
            message: "All category retrieved successfully",
            results: category,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await readCategory(req.params.id)
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            results: category,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.createCategory = async (req, res) => {
    try {
      const category = await createCategory(req.body);
      res.status(200).json({
        success: true,
        message: "category created successfully",
        results: category,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  

exports.updateCategory = async (req, res) => {
    try {
        const category = await updateCategory(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            results: category,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id)
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            results: category,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}