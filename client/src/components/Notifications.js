import React, { useState, useEffect } from "react";
import "./styles/Notifications.css";
import { useNavigate } from "react-router-dom";
import { getNotifications, markNotificationAsRead } from "../api/notificationApi";

const Notifications = ({ userId, open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch notifications
  useEffect(() => {
    if (!userId || !open) return;

    async function load() {
      try {
        const res = await getNotifications(userId);
        console.log(res);
        
        setNotifications(res);
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    }

    load();
  }, [userId, open]);

  const handleClick = async (notif) => {
    // Mark as read
    await markNotificationAsRead(notif.id);

    if (notif.redirect_url) {
      navigate(notif.redirect_url);
      onClose();
    }
  };

  return (
    <div className={`notify-panel ${open ? "open" : ""}`}>
      <div className="notify-header">
        <h3>Notifications</h3>
        <button className="notify-close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="notify-list">
        {notifications.length === 0 ? (
          <p className="notify-empty">No notifications yet 😴</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notify-item ${!n.is_read ? "unread" : ""}`}
              onClick={() => handleClick(n)}
            >
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <small>{new Date(n.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
