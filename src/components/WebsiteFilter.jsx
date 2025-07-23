import React from 'react';
import './WebsiteFilter.css';

function WebsiteFilter({ onWebsiteFilterChange, websiteFilter }) {
  const handleFilterChange = (e) => {
    onWebsiteFilterChange(e.target.value);
  };

  return (
    <div className="website-filter-container">
      <label className="filter-label">
        🌐 Website Availability
      </label>
      <div className="radio-group">
        <div className="radio-option">
          <input
            type="radio"
            id="website-all"
            name="website-filter"
            value="all"
            checked={websiteFilter === 'all'}
            onChange={handleFilterChange}
          />
          <label htmlFor="website-all">All Breweries</label>
        </div>
        
        <div className="radio-option">
          <input
            type="radio"
            id="website-has"
            name="website-filter"
            value="has_website"
            checked={websiteFilter === 'has_website'}
            onChange={handleFilterChange}
          />
          <label htmlFor="website-has">Has Website</label>
        </div>
        
        <div className="radio-option">
          <input
            type="radio"
            id="website-no"
            name="website-filter"
            value="no_website"
            checked={websiteFilter === 'no_website'}
            onChange={handleFilterChange}
          />
          <label htmlFor="website-no">No Website</label>
        </div>
      </div>
      <div className="filter-hint">
        Filter by website availability
      </div>
    </div>
  );
}

export default WebsiteFilter; 