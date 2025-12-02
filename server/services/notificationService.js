const Notification = require("../models/notificationModel");

exports.sendNotification = async ({
  userId,
  title,
  message,
  redirectUrl = null,
  entityType = null,
  entityId = null,
}) => {
  return await Notification.create({
    userId,
    title,
    message,
    redirectUrl,
    entityType,
    entityId,
  });
};
