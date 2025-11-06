import React from "react";
import {
  FaUser,
  FaBullhorn,
  FaFlag,
  FaCog,
  FaChartBar,
  FaAd,
} from "react-icons/fa";
import "./index.css";

const AdminDashboard = () => {
  return (
    <div className="admindash-container">
      {/* ===== SIDEBAR ===== */}
      <aside className="admindash-sidebar">
        <div className="admindash-sidebar-header">
          <div className="admindash-logo-circle">A</div>
          <h3 className="admindash-logo-text">Desi Connect</h3>
        </div>

        <ul className="admindash-sidebar-menu">
          <li className="admindash-menu-item active">
            <FaChartBar className="admindash-menu-icon" /> Dashboard
          </li>
          <li className="admindash-menu-item">
            <FaUser className="admindash-menu-icon" /> Users
          </li>
          <li className="admindash-menu-item">
            <FaAd className="admindash-menu-icon" /> Ads
          </li>
          <li className="admindash-menu-item">
            <FaFlag className="admindash-menu-icon" /> Reports
          </li>
          <li className="admindash-menu-item">
            <FaCog className="admindash-menu-icon" /> Settings
          </li>
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="admindash-main">
        <h1 className="admindash-title">Admin Dashboard</h1>

        {/* ===== STATS CARDS ===== */}
        <div className="admindash-stats-grid">
          <div className="admindash-stat-card">
            <img
              src="/images/dashboarduser1.jpg"
              alt="User"
              className="admindash-stat-img"
            />
            <div className="admindash-stat-info">
              <p className="admindash-stat-label">Total Users</p>
              <h3 className="admindash-stat-value">15,200</h3>
            </div>
          </div>

          <div className="admindash-stat-card highlight">
            <img
              src="/images/dashboarduser2.jpg"
              alt="Ads"
              className="admindash-stat-img"
            />
            <div className="admindash-stat-info">
              <p className="admindash-stat-label">Total Ads</p>
              <h3 className="admindash-stat-value">25,800</h3>
            </div>
          </div>

          <div className="admindash-stat-card">
            <img
              src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGZvciUyMHNhbGV8ZW58MHx8MHx8fDA%3D"
              alt="Active"
              className="admindash-stat-img"
            />
            <div className="admindash-stat-info">
              <p className="admindash-stat-label">Active Ads</p>
              <h3 className="admindash-stat-value">18,500</h3>
            </div>
          </div>

          <div className="admindash-stat-card warning">
            <img
              src="/images/postad1.jpg"
              alt="Flagged"
              className="admindash-stat-img"
            />
            <div className="admindash-stat-info">
              <p className="admindash-stat-label">Flagged Ads</p>
              <h3 className="admindash-stat-value">325</h3>
            </div>
          </div>
        </div>

        {/* ===== RECENT ADS ===== */}
        <section className="admindash-section">
          <div className="admindash-section-header">
            <h2 className="admindash-section-title">Recent Ads</h2>
            <input
              type="text"
              placeholder="🔍 Search"
              className="admindash-search-box"
            />
          </div>

          <div className="admindash-table-container">
            <table className="admindash-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Poster By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="/images/postad2.jpg"
                      alt="Car"
                      className="admindash-table-img"
                    />
                  </td>
                  <td>Used Car 2019</td>
                  <td>Cars</td>
                  <td>John</td>
                  <td>Active</td>
                  <td>Edit | Delete</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGZvciUyMHNhbGV8ZW58MHx8MHx8fDA%3D"
                      alt="Room"
                      className="admindash-table-img"
                    />
                  </td>
                  <td>Room for Rent</td>
                  <td>Housing</td>
                  <td>Priya</td>
                  <td>Pending</td>
                  <td>Edit | Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== LATEST USERS ===== */}
        <section className="admindash-section">
          <h2 className="admindash-section-title">Latest Users</h2>
          <div className="admindash-table-container">
            <table className="admindash-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Registered On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="/images/caradscustomer2.jpg"
                      alt="User"
                      className="admindash-table-img"
                    />
                  </td>
                  <td>Priya Patel</td>
                  <td>priya@example.com</td>
                  <td>Active</td>
                  <td>2025-10-08</td>
                  <td>View | Suspend</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="/images/caradscustomer1.jpg"
                      alt="User"
                      className="admindash-table-img"
                    />
                  </td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Active</td>
                  <td>2025-10-02</td>
                  <td>View | Suspend</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
