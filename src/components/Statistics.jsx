import React from 'react';
import './Statistics.css';

function Statistics({ breweries, filteredBreweries }) {
  if (!breweries || breweries.length === 0) {
    return null;
  }

  const allBreweries = breweries;
  const displayedBreweries = filteredBreweries || breweries;

  // Calculate statistics for all breweries
  const totalBreweries = allBreweries.length;
  const filteredCount = displayedBreweries.length;
  
  // Most common brewery type in filtered results
  const typeCount = displayedBreweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonType = Object.entries(typeCount).reduce((a, b) => 
    typeCount[a[0]] > typeCount[b[0]] ? a : b
  );

  // Most common state/province in filtered results
  const stateCount = displayedBreweries.reduce((acc, brewery) => {
    const state = brewery.state_province || 'unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonState = Object.entries(stateCount).reduce((a, b) => 
    stateCount[a[0]] > stateCount[b[0]] ? a : b
  );

  // Count breweries by country in filtered results
  const countryCount = displayedBreweries.reduce((acc, brewery) => {
    const country = brewery.country || 'unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  
  const totalCountries = Object.keys(countryCount).length;

  // Breweries with websites in filtered results
  const breweriesWithWebsite = displayedBreweries.filter(brewery => brewery.website_url).length;
  const websitePercentage = displayedBreweries.length > 0 ? 
    Math.round((breweriesWithWebsite / displayedBreweries.length) * 100) : 0;

  return (
    <div className="statistics-container">
      <h2>📊 Brewery Statistics</h2>
      {filteredCount !== totalBreweries && (
        <div className="filter-info">
          Showing {filteredCount} of {totalBreweries} breweries
        </div>
      )}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{filteredCount}</div>
          <div className="stat-label">
            {filteredCount === totalBreweries ? 'Total Breweries' : 'Filtered Results'}
          </div>
          {filteredCount !== totalBreweries && (
            <div className="stat-description">
              {totalBreweries} total breweries
            </div>
          )}
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{mostCommonType[1]}</div>
          <div className="stat-label">Most Common Type</div>
          <div className="stat-description">
            {mostCommonType[0].charAt(0).toUpperCase() + mostCommonType[0].slice(1)} breweries
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{mostCommonState[1]}</div>
          <div className="stat-label">Top Location</div>
          <div className="stat-description">
            Breweries in {mostCommonState[0]}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{totalCountries}</div>
          <div className="stat-label">Countries</div>
          <div className="stat-description">
            {filteredCount === totalBreweries ? 'Represented in dataset' : 'In filtered results'}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{websitePercentage}%</div>
          <div className="stat-label">Have Websites</div>
          <div className="stat-description">
            {breweriesWithWebsite} of {displayedBreweries.length} breweries
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics; 