import React from "react";
import "./CategoryView.css";

const CategoryHeader = ({ title, subtitle }) => {
  return (
    <div className="category-header">
      <nav className="breadcrumb">Home &gt; Cars &gt; Used Cars</nav>
      <h1 className="category-title">{title}</h1>
      <p className="category-subtitle">{subtitle}</p>
    </div>
  );
};

export default CategoryHeader;
