const Notification = require("../models/notificationModel");
const { sendNotification } = require("../services/notificationService");

// Create notification (optional for admin)
exports.createNotification = async (req, res) => {
  await sendNotification(req.body);
  res.json({ success: true, message: "Notification sent." });
};

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  
  const data = await Notification.getByUserId(userId);
  
  res.json(data);
};

// Mark as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  await Notification.markRead(id);
  res.json({ success: true });
};

// Clear all notifications
exports.clearNotifications = async (req, res) => {
  const { userId } = req.params;
  await Notification.clearAll(userId);
  res.json({ success: true });
};
