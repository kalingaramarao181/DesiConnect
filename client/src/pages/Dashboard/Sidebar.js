import React from "react";
import "./styles/Sidebar.css";

export default function Sidebar({ setPage, current }) {
  return (
    <div className="dc-sidebar">
      <h2 className="dc-sidebar-title">Desi Connect Admin</h2>

      <div 
        className={`dc-menu-item ${current === "dashboard" ? "active" : ""}`} 
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </div>

      <div 
        className={`dc-menu-item ${current === "users" ? "active" : ""}`} 
        onClick={() => setPage("users")}
      >
        Users
      </div>

      <div 
        className={`dc-menu-item ${current === "ads" ? "active" : ""}`} 
        onClick={() => setPage("ads")}
      >
        Ads
      </div>

      <div 
        className={`dc-menu-item ${current === "reports" ? "active" : ""}`} 
        onClick={() => setPage("reports")}
      >
        Reports
      </div>
    </div>
  );
}
