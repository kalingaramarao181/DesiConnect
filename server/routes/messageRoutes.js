const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Get all messages for a chat
router.get("/", messageController.getMessages);

router.get("/chat-users", messageController.getChatUsers);


// Send new message
router.post("/", messageController.sendMessage);

// Mark as read
router.put("/mark-read", messageController.markAsRead);

module.exports = router;
