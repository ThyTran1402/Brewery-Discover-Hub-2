import React from 'react';
import './CountryFilter.css';

function CountryFilter({ breweries, onCountryChange, selectedCountry }) {
  // Get unique countries from breweries data
  const countries = [...new Set(breweries.map(brewery => brewery.country))].filter(Boolean).sort();

  const handleCountryChange = (e) => {
    onCountryChange(e.target.value);
  };

  return (
    <div className="country-filter-container">
      <label htmlFor="country-filter" className="filter-label">
        🌍 Filter by Country
      </label>
      <select
        id="country-filter"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="filter-select"
      >
        <option value="all">All Countries</option>
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className="filter-hint">
        Filter by country location
      </div>
    </div>
  );
}

export default CountryFilter; 