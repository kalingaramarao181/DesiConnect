// src/pages/CategoryAdsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { getAdsByCategory } from "../../../api/AdApi";
import { baseUrlImg } from "../../../Config/env";

const CategoryAdsPage = () => {
  const { categoryId } = useParams();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
  }, [categoryId ]);

  const fetchAds = async () => {
    console.log("Categoery Id: ", categoryId);
    
    try {
      const res = await getAdsByCategory(categoryId);
      console.log(res);
      
      if (res?.data) {
        setAds(res.data);
      }
    } catch (error) {
      console.error("Error loading ads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usedcars-page-wrapper">
      {/* ===== Hero Section ===== */}
      <div className="usedcars-hero-section">
        <div className="usedcars-hero-content">
          <h1>Explore {ads[0]?.category_name || "Category"}</h1>
          <p>Find the best listings posted by our community.</p>
        </div>
      </div>

      {/* ===== Main Content Section ===== */}
      <div className="usedcars-main-section">
        {/* ==== Left Filter Sidebar ==== */}
        <div className="usedcars-filter-section">
          <div className="usedcars-filter-header">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="usedcars-logo"
            />
            <div className="usedcars-buy-sell-buttons">
              <button className="usedcars-btn orange-btn">Buy</button>
              <button className="usedcars-btn grey-btn">Sell</button>
            </div>
          </div>

          <div className="usedcars-filter-group">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" className="usedcars-select">
              <option>Price (Low - High)</option>
              <option>Price (High - Low)</option>
              <option>Date (Newest)</option>
            </select>
          </div>

          <button className="usedcars-view-btn">View Details</button>
        </div>

        {/* ==== Right Ads Display Section ==== */}
        <div className="usedcars-cards-section">
          {loading ? (
            <p>Loading ads...</p>
          ) : ads.length === 0 ? (
            <p>No ads available for this category.</p>
          ) : (
            ads.map((ad) => (
              <div key={ ad.id} className="usedcars-card">
                <img
                  src={baseUrlImg + ad.images?.[0] }
                  alt={ad.title}
                  className="usedcars-card-img"
                />
                <div className="usedcars-card-body">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <div className="usedcars-card-footer">
                    <span className="usedcars-price">${ad.price}</span>
                    <button className="usedcars-details-btn">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAdsPage;
