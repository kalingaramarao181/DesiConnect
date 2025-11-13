const db = require("../config/db");

// Fetch chat messages between two users (for a specific ad)
const getMessages = async (senderId, receiverId, adId) => {
  const [rows] = await db.query(
    `
      SELECT * FROM messages 
      WHERE ad_id = ? 
        AND ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))
      ORDER BY sent_at ASC
    `,
    [adId, senderId, receiverId, receiverId, senderId]
  );
  return rows;
};

// Send a new message
const sendMessage = async (senderId, receiverId, adId, messageText) => {
  const [result] = await db.query(
    `
      INSERT INTO messages (sender_id, receiver_id, ad_id, message_text)
      VALUES (?, ?, ?, ?)
    `,
    [senderId, receiverId, adId, messageText]
  );
  return { id: result.insertId };
};

// Mark messages as read
const markAsRead = async (senderId, receiverId, adId) => {
  await db.query(
    `
      UPDATE messages 
      SET is_read = TRUE 
      WHERE sender_id = ? AND receiver_id = ? AND ad_id = ?
    `,
    [senderId, receiverId, adId]
  );
};

const getChatUsers = async (adId, ownerId) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id AS userId,
      u.full_name AS userName,
      u.email AS userEmail,
      
      -- 🟠 Last message text
      (
        SELECT m2.message_text 
        FROM messages m2
        WHERE 
          ((m2.sender_id = u.id AND m2.receiver_id = ?) OR
           (m2.sender_id = ? AND m2.receiver_id = u.id))
          AND m2.ad_id = ?
        ORDER BY m2.sent_at DESC
        LIMIT 1
      ) AS lastMessage,

      -- 🔵 Unread messages count (messages sent by the user to owner and not read)
      (
        SELECT COUNT(*) 
        FROM messages m3
        WHERE 
          m3.sender_id = u.id
          AND m3.receiver_id = ?
          AND m3.ad_id = ?
          AND m3.is_read = 0
      ) AS unreadCount

    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.ad_id = ? AND m.receiver_id = ?
    GROUP BY u.id, u.full_name, u.email
    ORDER BY 
      (SELECT MAX(m4.sent_at)
       FROM messages m4
       WHERE ((m4.sender_id = u.id AND m4.receiver_id = ?) 
          OR (m4.sender_id = ? AND m4.receiver_id = u.id))
          AND m4.ad_id = ?) DESC
    `,
    [
      ownerId, ownerId, adId,  // for last message subquery
      ownerId, adId,           // for unread count
      adId, ownerId,           // for main WHERE
      ownerId, ownerId, adId   // for last message order subquery
    ]
  );
  return rows;
};


module.exports = { getMessages, sendMessage, markAsRead, getChatUsers };
