const CategoryModel = require("../models/categoryModel");
const fs = require("fs");
const path = require("path");

const categoryController = {
  // GET all categories
  fetchCategories: async (req, res) => {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // POST - add
  addCategory: async (req, res) => {
    try {
      const { category_name, description } = req.body;
      const icon = req.file ? req.file.path : null;

      if (!category_name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      const id = await CategoryModel.createCategory(
        category_name,
        description || "",
        icon || ""
      );

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        id,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // PUT - update
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, description } = req.body;

      const existingCategory = await CategoryModel.getCategoryById(id);
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      let icon = existingCategory.icon;
      if (req.file) {
        // Delete old icon if exists
        if (icon && fs.existsSync(icon)) {
          fs.unlinkSync(icon);
        }
        icon = req.file.path;
      }

      await CategoryModel.updateCategory(id, category_name, description, icon);

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // DELETE - remove
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const existingCategory = await CategoryModel.getCategoryById(id);
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      // Delete icon if exists
      if (existingCategory.icon && fs.existsSync(existingCategory.icon)) {
        fs.unlinkSync(existingCategory.icon);
      }

      await CategoryModel.deleteCategory(id);

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = categoryController;
