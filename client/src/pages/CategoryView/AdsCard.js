import React from "react";
import { baseUrlImg } from "../../Config/env";
import { Link } from "react-router-dom";

const AdsCard = ({ ad }) => {
    
  return (
    <Link to={`/ads/${ad.id}`} className="ads-card-link">
    <div className="ads-card">
      <div className="ads-image-wrapper">
        <img src={baseUrlImg + ad.images?.[0]} alt={ad.title} className="ads-image" />
      </div>
      <div className="ads-details">
        <h4 className="ads-title">{ad.title}</h4>
        <p className="ads-description">{ad.description}</p>
        <div className="ads-price">${ad.price} USD</div>
        <p className="ads-date">{ad.posted_ago || "Just now"}</p>
      </div>
    </div>
    </Link>
  );
};

export default AdsCard;
