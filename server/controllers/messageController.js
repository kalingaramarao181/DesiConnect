const Message = require("../models/Message");

// GET chat messages
exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId, adId } = req.query;
    
    const messages = await Message.getMessages(senderId, receiverId, adId);
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// POST new message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, adId, messageText } = req.body;
    
    if (!senderId || !receiverId || !adId || !messageText) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newMsg = await Message.sendMessage(senderId, receiverId, adId, messageText);
    res.status(201).json({ success: true, id: newMsg.id });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// PATCH mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { senderId, receiverId, adId } = req.body;
    console.log(senderId, receiverId, adId);
    
    await Message.markAsRead(senderId, receiverId, adId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error marking messages as read:", err);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};


exports.getChatUsers = async (req, res) => {
  try {
    const { adId, ownerId } = req.query;
    const chatUsers = await Message.getChatUsers(adId, ownerId);
    res.json(chatUsers);
  } catch (err) {
    console.error("Error fetching chat users:", err);
    res.status(500).json({ error: "Failed to fetch chat users" });
  }
};

