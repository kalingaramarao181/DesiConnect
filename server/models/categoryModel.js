const db = require("../config/db");

const CategoryModel = {
  // Get all categories
  getAllCategories: async () => {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    return rows;
  },

  // Get single category by ID
  getCategoryById: async (id) => {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  },

  // Add new category
  createCategory: async (category_name, description, icon) => {
    const [result] = await db.query(
      "INSERT INTO categories (category_name, description, icon, created_at) VALUES (?, ?, ?, NOW())",
      [category_name, description, icon]
    );
    return result.insertId;
  },

  // Update category
  updateCategory: async (id, category_name, description, icon) => {
    const [result] = await db.query(
      "UPDATE categories SET category_name = ?, description = ?, icon = ? WHERE id = ?",
      [category_name, description, icon, id]
    );
    return result.affectedRows;
  },

  // Delete category
  deleteCategory: async (id) => {
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = CategoryModel;
