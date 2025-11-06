const db = require("../config/db");

const CategoryFieldModel = {
  // Get all fields for a category
  getFieldsByCategory: async (category_id) => {
    const [rows] = await db.query(
      "SELECT * FROM category_fields WHERE category_id = ? ORDER BY id ASC",
      [category_id]
    );
    return rows;
  },

  // Create new field
  createField: async (data) => {
    const [result] = await db.query(
      `INSERT INTO category_fields 
      (category_id, field_name, label, input_type, options, required, placeholder)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.category_id,
        data.field_name,
        data.label,
        data.input_type || "text",
        data.options || null,
        data.required || false,
        data.placeholder || null,
      ]
    );
    return result.insertId;
  },

  // Update existing field
  updateField: async (id, data) => {
    const [result] = await db.query(
      `UPDATE category_fields SET field_name = ?, label = ?, input_type = ?, options = ?, required = ?, placeholder = ? WHERE id = ?`,
      [
        data.field_name,
        data.label,
        data.input_type || "text",
        data.options || null,
        data.required || false,
        data.placeholder || null,
        id,
      ]
    );
    return result.affectedRows > 0;
  },

  // Delete field
  deleteField: async (id) => {
    const [result] = await db.query("DELETE FROM category_fields WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = CategoryFieldModel;
