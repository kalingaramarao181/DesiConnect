import React from "react";
import "./index.css";
import {
  FaAd,
  FaEnvelope,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

const adsData = [
  {
    id: 1,
    img: "/images/postad1.jpg",
    title: "Room for Rent near Tech Campus",
    price: "$8,600 USD",
    views: "350",
  },
  {
    id: 2,
    img: "/images/postad2.jpg",
    title: "Used Car 2019 - Excellent Canpa",
    price: "$8,400 USD",
    views: "320",
  },
  {
    id: 3,
    img: "/images/postad3.jpg",
    title: "Used Car 2019 - Excellent Condition",
    price: "$8,400 USD",
    views: "350",
  },
  {
    id: 4,
    img: "/images/postad4.jpg",
    title: "Room for Rent near Tech Campus",
    price: "$8,400 USD",
    views: "350",
  },
  {
    id: 5,
    img: "/images/postad5.jpg",
    title: "Find for Car Pool Gapiks",
    price: "$8,500 USD",
    views: "350",
  },
  {
    id: 6,
    img: "/images/postad6.jpg",
    title: "Exitlity Parts",
    price: "$8,500 USD",
    views: "350",
    buttons: true,
  },
];

const PostedAds = () => {
  return (
    <div className="postads-container">
      {/* LEFT SECTION */}
      <div className="postads-left-section">
        <div className="postads-header">
          <h2 className="postads-welcome">Welcome, Priya!</h2>
          <h3 className="postads-location">Beorgban</h3>
          <p className="postads-subtext">
            📣 Desi Connect's trusted classifieds since 2014!
          </p>
          <button className="postads-btn">Post Your Ads</button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="postads-right-section">
        <div className="postads-main-flex">
          {/* SIDEBAR */}
          <div className="postads-sidebar">
            <div className="postads-menu-item active">
              <FaAd className="postads-icon" /> My Ads Posted
            </div>
            <div className="postads-menu-item">
              <FaAd className="postads-icon" /> My Ads
            </div>
            <div className="postads-menu-item">
              <FaEnvelope className="postads-icon" /> Messages
            </div>
            <div className="postads-menu-item">
              <FaHeart className="postads-icon" /> Favorites
            </div>
            <div className="postads-menu-item">
              <FaUser className="postads-icon" /> Profile
            </div>
            <div className="postads-menu-item">
              <FaSignOutAlt className="postads-icon" /> Logout
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="postads-content-section">
            {/* STATS */}
            <div className="postads-stats-flex">
              <div className="postads-stat-card">
                <h4 className="postads-stat-title">Total Ads Posted</h4>
                <p className="postads-stat-value">12</p>
                <FaChartLine className="postads-stat-icon" />
              </div>
              <div className="postads-stat-card">
                <h4 className="postads-stat-title">Total Views</h4>
                <p className="postads-stat-value">5,450</p>
                <FaChartLine className="postads-stat-icon" />
              </div>
              <div className="postads-stat-card">
                <h4 className="postads-stat-title">Active Ads</h4>
                <p className="postads-stat-value">8</p>
                <FaChartLine className="postads-stat-icon" />
              </div>
            </div>

            {/* POSTED ADS GRID */}
            <div className="postads-ads-section">
              <h3 className="postads-ads-title">My Posted Ads</h3>
              <div className="postads-ads-grid">
                {adsData.map((ad) => (
                  <div key={ad.id} className="postads-ad-card">
                    <img src={ad.img} alt={ad.title} className="postads-ad-image" />
                    <div className="postads-ad-info">
                      <p className="postads-ad-title">{ad.title}</p>
                      <p className="postads-ad-price">{ad.price}</p>
                      <p className="postads-ad-views">Views: {ad.views}</p>
                      {ad.buttons && (
                        <div className="postads-ad-buttons">
                          <button className="postads-edit-btn">Edit Ad</button>
                          <button className="postads-delete-btn">Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedAds;
