import React from "react";
import AdsCard from "./AdsCard";

const AdsGrid = ({ ads }) => {
  return (
    <div className="ads-grid">
      {ads.map((ad, index) => (
        <AdsCard key={index} ad={ad} />
      ))}
    </div>
  );
};

export default AdsGrid;
