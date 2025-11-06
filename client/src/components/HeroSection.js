// src/pages/CategoryAdsPage/HeroSection.js
import React from "react";
import "./styles/HeroSection.css";

const HeroSection = ({ title }) => {
  return (
    <div className="usedcars-hero-section">
      <div className="usedcars-hero-content">
        <h1>Explore {title}</h1>
        <p>Find the best listings posted by our community.</p>
      </div>
    </div>
  );
};

export default HeroSection;
