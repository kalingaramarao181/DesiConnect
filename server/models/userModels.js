// models/User.js
const db = require("../config/db"); // mysql2/promise pool
const bcrypt = require("bcryptjs");

const User = {
  // Create a new user
  createUser: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return result;
  },

  // Find user by email
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  },

  // Find email by user ID
  findEmailById: async (userId) => {
    const [rows] = await db.query("SELECT email FROM users WHERE id = ?", [userId]);
    return rows[0]?.email || null;
  },

  // Get all users with basic info
  getUsers: async () => {
    const [rows] = await db.query("SELECT full_name AS userName, id AS userId FROM users");
    return rows.length ? rows : null;
  },

  // Find user by ID
  findById: async (userId) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    return rows[0] || null;
  },

  // Update user password
  updateUserPassword: async (email, hashedPassword) => {
    const [result] = await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );
    return result;
  },

  // Get all users with role name
  findAllUsers: async () => {
    const [rows] = await db.query(
      `SELECT users.*, roles.name AS role 
       FROM users 
       JOIN roles ON users.role_id = roles.id`
    );
    return rows.length ? rows : null;
  },

  // Get paginated users with search
  getAllUsers: async (skip = 0, limit = 10, search = "") => {
    const searchPattern = `%${search}%`;
    const [rows] = await db.query(
      `SELECT * FROM users 
       WHERE full_name LIKE ? OR email LIKE ? OR role LIKE ?
       LIMIT ? OFFSET ?`,
      [searchPattern, searchPattern, searchPattern, limit, skip]
    );
    return rows;
  },

  // Get count of users for pagination
  getUsersCount: async (search = "") => {
    const searchPattern = `%${search}%`;
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM users 
       WHERE full_name LIKE ? OR email LIKE ? OR role LIKE ?`,
      [searchPattern, searchPattern, searchPattern]
    );
    return rows[0]?.count || 0;
  },
};

module.exports = User;
