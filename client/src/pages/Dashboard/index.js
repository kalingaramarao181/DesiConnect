import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Ads from "./Ads";
import Reports from "./Reports";
import "./index.css";

export default function MainDashboard() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Sidebar setPage={setPage} current={page} />
      <Header />

      <div style={{ marginLeft: "250px", marginTop: "80px", padding: "20px" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "users" && <Users />}
        {page === "ads" && <Ads />}
        {page === "reports" && <Reports />}
      </div>
    </>
  );
}
