import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/assets/css/dashboard.css";

// Dummy admin check (replace with real auth logic)
const isAdmin = () => {
  // Example: check localStorage or context for admin login
  return localStorage.getItem("isAdmin") === "true";
};

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="ttr-opened-sidebar ttr-pinned-sidebar" style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Header */}
      <header className="ttr-header">
        <div className="ttr-header-wrapper">
          <div className="ttr-toggle-sidebar ttr-material-button">
            <i className="ti-close ttr-open-icon"></i>
            <i className="ti-menu ttr-close-icon"></i>
          </div>
          <div className="ttr-logo-box">
            <a href="/admin" className="ttr-logo">
              <img className="ttr-logo-mobile" alt="" src="assets/images/logo-mobile.png" width="30" height="30" />
              <img className="ttr-logo-desktop" alt="" src="assets/images/logo-white.png" width="160" height="27" />
            </a>
          </div>
          <div className="ttr-header-menu">
            <ul className="ttr-header-navigation">
              <li>
                <a href="/" className="ttr-material-button ttr-submenu-toggle">HOME</a>
              </li>
              <li>
                <a href="/courses" className="ttr-material-button ttr-submenu-toggle">COURSES</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* Sidebar */}
      <div className="ttr-sidebar">
        <div className="ttr-sidebar-wrapper content-scroll">
          <div className="ttr-sidebar-logo">
            <a href="/admin"><img alt="" src="assets/images/logo.png" width="122" height="27" /></a>
            <div className="ttr-sidebar-toggle-button">
              <i className="ti-arrow-left"></i>
            </div>
          </div>
          <nav className="ttr-sidebar-navi">
            <ul>
              <li>
                <a href="/admin" className="ttr-material-button">
                  <span className="ttr-icon"><i className="ti-home"></i></span>
                  <span className="ttr-label">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/admin/courses" className="ttr-material-button">
                  <span className="ttr-icon"><i className="ti-book"></i></span>
                  <span className="ttr-label">Courses</span>
                </a>
              </li>
              <li>
                <a href="/admin/mailbox" className="ttr-material-button">
                  <span className="ttr-icon"><i className="ti-email"></i></span>
                  <span className="ttr-label">Mailbox</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <main style={{ marginLeft: 300, padding: 32, paddingTop: 80 }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, minWidth: 220, flex: 1 }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>1,234</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, minWidth: 220, flex: 1 }}>
            <h3>Courses</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>9</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, minWidth: 220, flex: 1 }}>
            <h3>Orders</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>56</p>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <h2>Recent Activity</h2>
          <ul>
            <li>User John Doe purchased "Placement Aptitude Course"</li>
            <li>New course "HCL MOCK TEST" added</li>
            <li>User Jane Smith registered</li>
          </ul>
        </div>
      </main>
      {/* Responsive overlay for mobile sidebar */}
      <div className="ttr-overlay" style={{ display: 'none' }}></div>
    </div>
  );
};

export default AdminPanel; 