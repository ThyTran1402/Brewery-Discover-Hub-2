import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  return (
    <div className="search-bar-container">
      <label htmlFor="search" className="search-label">
        🔍 Search Breweries
      </label>
      <div className="search-input-container">
        <input
          id="search"
          type="text"
          placeholder="Search by name, city, or state..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className="search-hint">
        Search across brewery names, cities, and states
      </div>
    </div>
  );
}

export default SearchBar; 