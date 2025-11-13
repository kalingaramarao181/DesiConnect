import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import Cookies from "js-cookie";
import FormView from "../forms/FormView";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [openForm, setOpenForm] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Check JWT token on mount
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token decode failed:", err);
        Cookies.remove("jwtToken");
      }
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
    setDropdownOpen(false);
  };

  // ✅ Called when login succeeds (from FormView)
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpenForm(false);
  };

  const handleClickProfile = () => {
    // Placeholder for profile click action
    window.location.href = "/profile";
  }

  // ✅ Handle Post Ad button click — login required
  const handlePostAd = () => {
    const token = Cookies.get("jwtToken");
    if (!token) {
      // If not logged in, open login popup
      setOpenForm("signin");
    } else {
      // If logged in, open Post Ad form
      setOpenForm("add");
    }
  };

  return (
    <>
      <header className="header-container">
        <div className="header-left-section">
          <img
            src="/images/logo.png"
            alt="Desi Connect Logo"
            className="header-logo"
          />
          <h1 className="header-title">Desi Connect</h1>
        </div>

        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <a href="/" className="header-nav-link">
                Home
              </a>
            </li>

            {/* ✅ Post Ad (Requires Login) */}
            <li onClick={handlePostAd} className="header-nav-item">
              Post Ad
            </li>

            {/* ✅ Conditional Login/Profile */}
            {!user ? (
              <li className="header-nav-item">
                <button
                  className="header-login-btn"
                  onClick={() => setOpenForm("signin")}
                >
                  Login
                </button>
              </li>
            ) : (
              <li className="header-profile-section">
                <div
                  className="header-profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user.avatar || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211471.png"}
                    alt="User Avatar"
                    className="header-avatar"
                  />
                  <span className="header-username">
                    {user.name || user.email?.split("@")[0]}
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="header-dropdown">
                    <p className="dropdown-username">{user.name}</p>
                    <button onClick={handleClickProfile}  className="dropdown-btn">Profile</button>
                    <button className="dropdown-btn">My Ads</button>
                    <button
                      className="dropdown-btn logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* ✅ Popup Form */}
      <FormView
        openForm={openForm}
        setOpenForm={setOpenForm}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
