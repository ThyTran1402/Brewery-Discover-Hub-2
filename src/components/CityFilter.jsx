import React, { useState } from 'react';
import './CityFilter.css';

function CityFilter({ onCityFilterChange }) {
  const [cityTerm, setCityTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCityTerm(value);
    onCityFilterChange(value);
  };

  const clearFilter = () => {
    setCityTerm('');
    onCityFilterChange('');
  };

  return (
    <div className="city-filter-container">
      <label htmlFor="city-filter" className="filter-label">
        🏙️ Filter by City
      </label>
      <div className="city-input-container">
        <input
          id="city-filter"
          type="text"
          placeholder="Enter city name..."
          value={cityTerm}
          onChange={handleInputChange}
          className="city-input"
        />
        {cityTerm && (
          <button 
            onClick={clearFilter}
            className="clear-button"
            aria-label="Clear city filter"
          >
            ×
          </button>
        )}
      </div>
      <div className="filter-hint">
        Search for breweries in specific cities
      </div>
    </div>
  );
}

export default CityFilter; 