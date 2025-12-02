import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import Cookies from "js-cookie";
import FormView from "../forms/FormView";
import { jwtDecode } from "jwt-decode";
import { IoIosNotifications } from "react-icons/io";
import Notifications from "../components/Notifications";
import { getNotifications } from "../api/notificationApi";

const Header = () => {
  const [openForm, setOpenForm] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);

  // Load user from JWT
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch {
        Cookies.remove("jwtToken");
      }
    }
  }, []);

  // Fetch unread count
  useEffect(() => {
    if (!user) return;

    async function loadCount() {
      try {
        const data = await getNotifications(user.id);
        const unread = data.filter((n) => !n.is_read).length;
        setNotifyCount(unread);
      } catch (err) {
        console.error("Error fetching notify count:", err);
      }
    }

    loadCount();
    const interval = setInterval(loadCount, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setDropdownOpen(false);
  };

  const handlePostAd = () => {
    if (!Cookies.get("jwtToken")) setOpenForm("signin");
    else setOpenForm("add");
  };

  return (
    <>
      <header className="header-container">
        <div className="header-left-section">
          <img src="/images/logo.png" className="header-logo" alt="logo" />
          <h1 className="header-title">Desi Connect</h1>
        </div>

        <nav className="header-nav">
          <ul className="header-nav-list">
            <li><a href="/" className="header-nav-link">Home</a></li>
            <li onClick={handlePostAd} className="header-nav-item">Post Ad</li>

            {!user ? (
              <li><button className="header-login-btn" onClick={() => setOpenForm("signin")}>Login</button></li>
            ) : (
              <>
                <li className="header-profile-section">
                  <div className="header-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img
                      src={user.avatar || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211471.png"}
                      className="header-avatar"
                      alt="avathar"
                    />
                    <span className="header-username">{user.name}</span>
                  </div>

                  {dropdownOpen && (
                    <div className="header-dropdown">
                      <p className="dropdown-username">{user.name}</p>
                      <button className="dropdown-btn" onClick={() => window.location.href="/profile"}>Profile</button>
                      <button className="dropdown-btn">My Ads</button>
                      <button className="dropdown-btn logout" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </li>

                <li className="header-nav-item notify-wrapper">
                  <div onClick={() => setNotifyOpen(!notifyOpen)} className="notify-icon-container">
                    <IoIosNotifications size={26} style={{ color: "#ff6600" }} />
                    {notifyCount > 0 && <span className="notify-badge">{notifyCount}</span>}
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <Notifications
        userId={user?.id}
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
      />

      <FormView openForm={openForm} setOpenForm={setOpenForm} onLoginSuccess={setUser} />
    </>
  );
};

export default Header;
