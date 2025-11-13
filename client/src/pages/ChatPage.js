import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  getMessages,
  sendMessageApi,
  getChatUsers,
  markMessagesAsRead,
} from "../api/messageApi";
import { CiRead } from "react-icons/ci";
import "./styles/ChatPage.css";

const ChatPage = ({ messageDetails }) => {
  const [messages, setMessages] = useState([]);
  const [adTitle, setAdTitle] = useState("Chat");
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const chatEndRef = useRef(null);

  // 🧠 Decode user from JWT
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setAdTitle(decoded.name || "Chat");
      } catch (err) {
        console.error("Token decode failed:", err);
        Cookies.remove("jwtToken");
      }
    }
  }, []);

  // 🧭 Auto scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Fetch + poll messages
  useEffect(() => {
    if (!user || !messageDetails) return;

    const receiver =
      activeChatUser?.userId || messageDetails.receiverId || null;
    if (!receiver) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(user.id, receiver, messageDetails.adId);
        setMessages(
          data.map((m) => ({
            id: m.id,
            text: m.message_text,
            senderId: m.sender_id,
            receiverId: m.receiver_id,
            time: new Date(m.sent_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            read: m.is_read,
          }))
        );
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [user, messageDetails, activeChatUser]);

  // 👥 Fetch chat users for ad owner
  useEffect(() => {
    if (!user || user.id !== messageDetails.receiverId) return;

    const fetchChatUsers = async () => {
      try {
        const data = await getChatUsers(messageDetails.adId, user.id);
        setChatUsers(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching chat users:", err);
      }
    };

    fetchChatUsers();
    const interval = setInterval(fetchChatUsers, 5000); // refresh user list
    return () => clearInterval(interval);
  }, [user, messageDetails]);

  // ✅ Select chat user + mark messages as read
  const handleChatUserClick = async (chatUser) => {
    setActiveChatUser(chatUser);
    try {
      await markMessagesAsRead(chatUser.userId, user.id, messageDetails.adId);
      // Remove unread badge instantly
      setChatUsers((prev) =>
        prev.map((u) =>
          u.userId === chatUser.userId ? { ...u, unreadCount: 0 } : u
        )
      );
    } catch (err) {
      console.error("Mark read failed:", err);
    }
  };

  // 💬 Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const receiver = activeChatUser?.userId || messageDetails.receiverId;
    const msg = {
      senderId: user.id,
      receiverId: receiver,
      adId: messageDetails.adId,
      messageText: newMessage,
    };

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newMessage,
        senderId: user.id,
        receiverId: receiver,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      },
    ]);
    setNewMessage("");

    try {
      await sendMessageApi(msg);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const isAdOwner = user?.id === messageDetails.receiverId;

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-user">
          <div className="chat-avatar">{adTitle.charAt(0)}</div>
          <div className="chat-owner-data">
            <h3 className="chat-owner-name">
              {activeChatUser?.userName || adTitle}
            </h3>
            <p>
              {isAdOwner
                ? "Chat with interested users"
                : "Chat with the ad owner"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="chat-content">
        {isAdOwner && (
          <div className="chat-sidebar">
            {chatUsers.length > 0 ? (
              chatUsers.map((chatUser) => (
                <div
                  key={chatUser.userId}
                  className={`chat-user-item ${
                    activeChatUser?.userId === chatUser.userId ? "active" : ""
                  }`}
                  onClick={() => handleChatUserClick(chatUser)}
                >
                  <div className="user-avatar">
                    {chatUser.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="chat-user-info">
                    <p className="chat-username">
                      {chatUser.userName}
                      {chatUser.unreadCount > 0 && (
                        <span className="unread-dot"></span>
                      )}
                    </p>
                    <p className="last-msg">
                      {chatUser.lastMessage?.length > 30
                        ? chatUser.lastMessage.slice(0, 30) + "..."
                        : chatUser.lastMessage}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No chat requests yet.</p>
            )}
          </div>
        )}

        <div className="chat-container">
          <div className="chat-body">
            {messages.length === 0 ? (
              <div className="no-messages">Start a conversation ✨</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${
                    msg.senderId === user?.id ? "sent" : "received"
                  }`}
                >
                  <div className="msg-bubble">
                    <p>{msg.text}</p>
                    <span>
                      {msg.time}
                      {msg.senderId === user?.id && (
                        <span className="read-status">
                          {msg.read ? <CiRead /> : " ✓"}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
