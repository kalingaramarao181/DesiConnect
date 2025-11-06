// src/pages/CategoryPage.js
import React from "react";
import {
  FaHome,
  FaCarAlt,
  FaUserFriends,
  FaPlane,
  FaBriefcase,
} from "react-icons/fa";
import "./index.css"; 

const categories = [
  {
    id: 1,
    icon: <FaHome />,
    title: "Find Room / Roommate",
    text: "Connect with students or professionals",
    className: "bg-blue",
    iconColor: "#007BFF",
  },
  {
    id: 2,
    icon: <FaCarAlt />,
    title: "Buy / Sell Car",
    text: "List your car or find one to buy",
    className: "bg-green",
    iconColor: "#28a745",
  },
  {
    id: 3,
    icon: <FaUserFriends />,
    title: "Moving Items Sale",
    text: "Sell your household items quickly",
    className: "bg-orange",
    iconColor: "#ff6600",
  },
  {
    id: 4,
    icon: <FaCarAlt />,
    title: "Find Car Pool",
    text: "Share rides and save money",
    className: "bg-yellow",
    iconColor: "#f5b700",
  },
  {
    id: 5,
    icon: <FaBriefcase />,
    title: "Find Jobs",
    text: "Discover your next opportunity",
    className: "bg-purple",
    iconColor: "#8e44ad",
  },
  {
    id: 6,
    icon: <FaPlane />,
    title: "Travel Companion",
    text: "Find someone to travel with",
    className: "bg-pink",
    iconColor: "#e83e8c",
  },
];

const CategoryPage = () => {
  return (
    <section className="category-section">
      <h2 className="section-title">Explore Categories</h2>
      <div className="category-container">
        {categories.map((item) => (
          <div key={item.id} className={`category-card ${item.className}`}>
            <div
              className="icon"
               style={{
    background: item.iconColor, // colored circle
    boxShadow: `0 0 10px ${item.iconColor}`,
  }}
            >
              {item.icon}
            </div>
            <h3 className="card-heading">{item.title}</h3>
            <p className="card-paragraph">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
