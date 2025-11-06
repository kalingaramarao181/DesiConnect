import React, { useEffect, useState } from "react";
import "./styles/ProfilePage.css";
import AdsGrid from "./CategoryView/AdsGrid";

const ProfilePage = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Kiran Majji",
    email: "kiran@example.com",
    about: "Desi Connect member passionate about connecting people.",
    avatar: "/images/user-avatar.png",
  });

  const [formData, setFormData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [showAds, setShowAds] = useState(false);

  // Dummy ads
  const currentAds = [
    { id: 1, title: "Room available in Atlanta", price: "400$", category: "Rooms" },
    { id: 2, title: "Looking for Indian Roommate", price: "300$", category: "Roommates" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  return (
    <div className="profile-main-container">
      {/* ===== PROFILE HEADER ===== */}
      <div className="profile-header-section">
        <img
          src={user.avatar}
          alt="profile"
          className="profile-user-avatar"
        />
        <h2 className="profile-user-name">{user.name}</h2>
        <p className="profile-user-email">{user.email}</p>

        <button
          className="profile-edit-btn"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* ===== EDIT PROFILE FORM ===== */}
      {editMode && (
        <div className="profile-edit-form fade-in-section">
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profile-input-box"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              className="profile-input-box"
              disabled
            />
          </label>

          <label>
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="profile-textarea"
            />
          </label>

          <button className="profile-save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}

      {/* ===== MY ADS SECTION ===== */}
      <div className="profile-ads-section">
        <button
          className="profile-show-ads-btn"
          onClick={() => setShowAds(!showAds)}
        >
          {showAds ? "Hide My Ads" : "Show My Ads"}
        </button>

        <div
          className={`profile-ads-container ${
            showAds ? "ads-visible" : "ads-hidden"
          }`}
        >
          {showAds && (
            currentAds.length > 0 ? (
              <AdsGrid ads={currentAds} />
            ) : (
              <p className="profile-no-ads-msg">No ads posted yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
