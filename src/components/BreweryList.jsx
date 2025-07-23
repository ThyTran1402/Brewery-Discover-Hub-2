import React from 'react';
import { Link } from 'react-router-dom';
import './BreweryList.css';

function BreweryList({ breweries }) {
  if (!breweries || breweries.length === 0) {
    return (
      <div className="brewery-list-container">
        <h2>🍺 Breweries</h2>
        <div className="no-results">
          <p>No breweries found matching your criteria.</p>
          <p>Try adjusting your search or filter settings.</p>
        </div>
      </div>
    );
  }

  const formatAddress = (brewery) => {
    const parts = [];
    if (brewery.address_1) parts.push(brewery.address_1);
    if (brewery.city) parts.push(brewery.city);
    if (brewery.state_province) parts.push(brewery.state_province);
    if (brewery.country) parts.push(brewery.country);
    return parts.join(', ');
  };

  const formatPhone = (phone) => {
    if (!phone) return null;
    // Simple phone formatting for display
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getTypeColor = (type) => {
    const colors = {
      micro: '#10b981',
      nano: '#f59e0b',
      regional: '#3b82f6',
      brewpub: '#8b5cf6',
      large: '#ef4444',
      planning: '#6b7280',
      contract: '#f97316',
      proprietor: '#06b6d4',
      closed: '#9ca3af'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="brewery-list-container">
      <h2>🍺 Breweries ({breweries.length})</h2>
      <div className="brewery-grid">
        {breweries.map(brewery => (
          <div key={brewery.id} className="brewery-card">
            <div className="brewery-header">
              <h3 className="brewery-name">{brewery.name}</h3>
              <span 
                className="brewery-type-badge"
                style={{ backgroundColor: getTypeColor(brewery.brewery_type) }}
              >
                {brewery.brewery_type?.charAt(0).toUpperCase() + brewery.brewery_type?.slice(1)}
              </span>
            </div>
            
            <div className="brewery-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span className="detail-text">
                  {formatAddress(brewery) || 'Address not available'}
                </span>
              </div>
              
              {brewery.phone && (
                <div className="detail-item">
                  <span className="detail-icon">📞</span>
                  <span className="detail-text">
                    {formatPhone(brewery.phone)}
                  </span>
                </div>
              )}
              
              {brewery.website_url && (
                <div className="detail-item">
                  <span className="detail-icon">🌐</span>
                  <a 
                    href={brewery.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              
              <div className="detail-item">
                <span className="detail-icon">🏪</span>
                <span className="detail-text">
                  ID: {brewery.id}
                </span>
              </div>
            </div>
            
            {/* PROJECT 6 FEATURE: Navigation to Detail View */}
            <div className="brewery-actions">
              <Link 
                to={`/brewery/${brewery.id}`} 
                className="view-details-btn"
              >
                <span className="btn-icon">🔍</span>
                <span>View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreweryList; 