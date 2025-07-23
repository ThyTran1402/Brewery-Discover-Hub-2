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

        <div className="sidebar-footer">
          <div className="app-info">
            <h4>Project 6 Features</h4>
            <p>Enhanced brewery dashboard with interactive visualizations and detailed views.</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🔍</span>
                <span>Advanced Search & Filtering</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Interactive Charts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔗</span>
                <span>Detailed Brewery Views</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>React Router Navigation</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar; 