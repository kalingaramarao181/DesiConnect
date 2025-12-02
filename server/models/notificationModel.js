const db = require("../config/db");

exports.create = async (data) => {
  const { userId, title, message, redirectUrl, entityType, entityId } = data;

  await db.query(
    `INSERT INTO notifications 
     (user_id, title, message, redirect_url, entity_type, entity_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, message, redirectUrl, entityType, entityId]
  );
};

exports.getByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

exports.markRead = async (id) => {
  await db.query("UPDATE notifications SET is_read = 1 WHERE id = ?", [id]);
};

exports.clearAll = async (userId) => {
  await db.query("DELETE FROM notifications WHERE user_id = ?", [userId]);
};
