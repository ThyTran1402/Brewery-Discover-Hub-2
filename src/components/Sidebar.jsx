import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <span className="logo-icon">🍺</span>
          <span className="logo-text">Brewery Hub</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <h3 className="nav-section-title">Navigation</h3>
        <ul className="nav-list">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/analysis" 
              className={`nav-link ${isActive('/analysis') ? 'active' : ''}`}
            >
              <span className="nav-icon">📈</span>
              <span className="nav-text">Data Analysis</span>
            </Link>
          </li>
        </ul>

        <h3 className="nav-section-title">Quick Stats</h3>
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-icon">🏭</span>
            <div className="stat-content">
              <span className="stat-value">50+</span>
              <span className="stat-label">Breweries</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🗺️</span>
            <div className="stat-content">
              <span className="stat-value">Multiple</span>
              <span className="stat-label">Locations</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📈</span>
            <div className="stat-content">
              <span className="stat-value">Real-time</span>
              <span className="stat-label">Data</span>
            </div>
          </div>
        </div>


      </nav>
    </aside>
  );
}

export default Sidebar; 