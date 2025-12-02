const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationControllers");

router.post("/", controller.createNotification);
router.get("/:userId", controller.getNotifications);
router.put("/read/:id", controller.markAsRead);
router.delete("/clear/:userId", controller.clearNotifications);

module.exports = router;
