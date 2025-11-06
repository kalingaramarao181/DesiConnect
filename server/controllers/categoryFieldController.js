const CategoryFieldModel = require("../models/categoryFieldModel");

const categoryFieldController = {
  // Get all fields for a category
  getFieldsByCategory: async (req, res) => {
    try {
      const { category_id } = req.params;
      const fields = await CategoryFieldModel.getFieldsByCategory(category_id);
      res.status(200).json({ success: true, data: fields });
    } catch (error) {
      console.error("Error fetching fields:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Add new field
  addField: async (req, res) => {
    try {
      const { category_id } = req.params;
      const { field_name, label, input_type, options, required, placeholder } = req.body;

      if (!field_name || !label) {
        return res.status(400).json({
          success: false,
          message: "field_name and label are required",
        });
      }

      const id = await CategoryFieldModel.createField({
        category_id,
        field_name,
        label,
        input_type,
        options,
        required,
        placeholder,
      });

      res.status(201).json({
        success: true,
        message: "Field added successfully",
        id,
      });
    } catch (error) {
      console.error("Error adding field:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Update field
  updateField: async (req, res) => {
    try {
      const { field_id } = req.params;
      const updatedData = req.body;

      const result = await CategoryFieldModel.updateField(field_id, updatedData);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Field not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Field updated successfully",
      });
    } catch (error) {
      console.error("Error updating field:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Delete field
  deleteField: async (req, res) => {
    try {
      const { field_id } = req.params;

      const result = await CategoryFieldModel.deleteField(field_id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Field not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Field deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting field:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = categoryFieldController;
