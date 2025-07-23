import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ onTypeChange, selectedType }) {
  const breweryTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'micro', label: 'Micro' },
    { value: 'nano', label: 'Nano' },
    { value: 'regional', label: 'Regional' },
    { value: 'brewpub', label: 'Brewpub' },
    { value: 'large', label: 'Large' },
    { value: 'planning', label: 'Planning' },
    { value: 'contract', label: 'Contract' },
    { value: 'proprietor', label: 'Proprietor' },
    { value: 'closed', label: 'Closed' }
  ];

  const handleTypeChange = (e) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className="category-filter-container">
      <label htmlFor="brewery-type" className="filter-label">
        🏷️ Filter by Type
      </label>
      <select
        id="brewery-type"
        value={selectedType}
        onChange={handleTypeChange}
        className="filter-select"
      >
        {breweryTypes.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <div className="filter-hint">
        Filter breweries by business type
      </div>
    </div>
  );
}

export default CategoryFilter; 