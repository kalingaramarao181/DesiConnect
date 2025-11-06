// src/pages/CategoryPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./styles/Categories.css";
import { getAllCategories } from "../api/categoryApi";

const colorClasses = [
  { className: "bg-blue", iconColor: "#007BFF" },
  { className: "bg-green", iconColor: "#28a745" },
  { className: "bg-orange", iconColor: "#ff6600" },
  { className: "bg-yellow", iconColor: "#f5b700" },
  { className: "bg-purple", iconColor: "#8e44ad" },
  { className: "bg-pink", iconColor: "#e83e8c" },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res?.data) {
        // Map backend data → add icon + color
        const formatted = res.data.map((item, index) => {
          const IconComponent = FaIcons[item.icon] || FaIcons.FaQuestionCircle;
          const styleSet = colorClasses[index % colorClasses.length];
          return {
            ...item,
            iconComponent: <IconComponent />,
            className: styleSet.className,
            iconColor: styleSet.iconColor,
          };
        });
        setCategories(formatted);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  return (
    <section className="category-section">
      <h2 className="section-title">Explore Categories</h2>
      <div className="category-container">
        {categories.map((item) => (
          <Link
            to={`/category/${item.id}`} 
            key={item.id}
            className={`category-card ${item.className}`}
          >
            <div
              className="icon"
              style={{
                background: item.iconColor,
                boxShadow: `0 0 10px ${item.iconColor}`,
              }}
            >
              {item.iconComponent}
            </div>
            <h3 className="card-heading">{item.category_name}</h3>
            <p className="card-paragraph">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
