import React, { useEffect, useState } from "react";
import "./styles/ProfilePage.css";
import AdsGrid from "./CategoryView/AdsGrid";
import { getUserDataFromCookies } from "../utils/cookiesData";
import { getUserById } from "../api/usersApi"
import { getAdsByUser } from "../api/AdApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentAds, setCurrentAds] = useState([]);

  const userData = getUserDataFromCookies();
  

  useEffect(() => {
    const fetchUser = async () => {
      if (!userData?.id) return;
      try {
        const res = await getUserById(userData.id);
        const ads = await getAdsByUser(userData.id, 1, 100);
        setCurrentAds(ads.data);
        console.log("Fetched User:", ads);
          setUser(res);
          setFormData(res);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userData?.id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // await updateUserById(user.id, formData);
      setUser(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="profile-main-container">
      {/* ===== PROFILE HEADER ===== */}
      <div className="profile-header-section">
        {user.profile_image ? <img
          src={user.avatar || "/images/user-avatar.png"}
          alt="profile"
          className="profile-user-avatar"
        /> : <div className="profile-user-avatar-placeholder">{user.fullName.charAt(0)}</div>}
        <h2 className="profile-user-name">{user.fullName}</h2>
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
              value={formData.fullName || ""}
              onChange={handleChange}
              className="profile-input-box"
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="profile-input-box"
            />
          </label>
          <label>
            Address:
            <textarea
              name="about"
              value={formData.location || ""}
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

        {showAds && (
          <div className="profile-ads-container ads-visible">
            {currentAds.length > 0 ? (
              <AdsGrid ads={currentAds} />
            ) : (
              <p className="profile-no-ads-msg">No ads posted yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;