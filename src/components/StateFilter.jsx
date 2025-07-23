import React from 'react';
import './StateFilter.css';

function StateFilter({ breweries, onStateChange, selectedState }) {
  // Get unique states from breweries data
  const states = [...new Set(breweries.map(brewery => brewery.state_province))].filter(Boolean).sort();

  const handleStateChange = (e) => {
    onStateChange(e.target.value);
  };

  return (
    <div className="state-filter-container">
      <label htmlFor="state-filter" className="filter-label">
        📍 Filter by State
      </label>
      <select
        id="state-filter"
        value={selectedState}
        onChange={handleStateChange}
        className="filter-select"
      >
        <option value="all">All States</option>
        {states.map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <div className="filter-hint">
        Filter by state/province location
      </div>
    </div>
  );
}

export default StateFilter; 