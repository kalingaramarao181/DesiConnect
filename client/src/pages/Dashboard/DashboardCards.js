import React from "react";
import "./styles/DashboardCards.css";

export default function DashboardCards() {
  return (
    <div className="dc-cards-wrapper">

      <div className="dc-dashboard-card">
        <h2>120</h2>
        <p>Total Ads</p>
      </div>

      <div className="dc-dashboard-card">
        <h2>85</h2>
        <p>Active Users</p>
      </div>

      <div className="dc-dashboard-card">
        <h2>42</h2>
        <p>Pending Approvals</p>
      </div>

      <div className="dc-dashboard-card">
        <h2>10</h2>
        <p>Reports Submitted</p>
      </div>

    </div>
  );
}
