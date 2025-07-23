import React from 'react';
import { Link } from 'react-router-dom';
import './DataAnalysisPage.css';

function DataAnalysisPage({ breweries }) {
  if (!breweries || breweries.length === 0) {
    return (
      <div className="analysis-loading">
        <p>Loading comprehensive data analysis...</p>
      </div>
    );
  }

  // Comprehensive data analysis
  const totalBreweries = breweries.length;
  
  // Business Model Analysis
  const businessModelData = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  const sortedBusinessModels = Object.entries(businessModelData)
    .sort(([,a], [,b]) => b - a);

  // Geographic Analysis
  const geographicData = {
    countries: {},
    states: {},
    cities: {}
  };
  
  breweries.forEach(brewery => {
    const country = brewery.country || 'Unknown';
    const state = brewery.state_province || 'Unknown';
    const city = brewery.city || 'Unknown';
    
    geographicData.countries[country] = (geographicData.countries[country] || 0) + 1;
    geographicData.states[state] = (geographicData.states[state] || 0) + 1;
    geographicData.cities[city] = (geographicData.cities[city] || 0) + 1;
  });

  const topCountries = Object.entries(geographicData.countries).sort(([,a], [,b]) => b - a).slice(0, 5);
  const topStates = Object.entries(geographicData.states).sort(([,a], [,b]) => b - a).slice(0, 10);
  const topCities = Object.entries(geographicData.cities).sort(([,a], [,b]) => b - a).slice(0, 15);

  // Digital Presence Analysis
  const withWebsite = breweries.filter(b => b.website_url).length;
  const withPhone = breweries.filter(b => b.phone).length;
  const digitalPresenceRate = (withWebsite / totalBreweries * 100).toFixed(1);
  const phoneAvailabilityRate = (withPhone / totalBreweries * 100).toFixed(1);

  // Digital presence by business type
  const digitalByType = {};
  sortedBusinessModels.forEach(([type]) => {
    const typeBreweries = breweries.filter(b => b.brewery_type === type);
    const typeWithWebsite = typeBreweries.filter(b => b.website_url).length;
    digitalByType[type] = {
      total: typeBreweries.length,
      withWebsite: typeWithWebsite,
      percentage: (typeWithWebsite / typeBreweries.length * 100).toFixed(1)
    };
  });

  // Address completeness analysis
  const addressFields = ['address_1', 'city', 'state_province', 'postal_code', 'country'];
  const addressCompleteness = breweries.map(brewery => {
    const filledFields = addressFields.filter(field => brewery[field]).length;
    return filledFields / addressFields.length;
  });
  const avgAddressCompleteness = (addressCompleteness.reduce((sum, rate) => sum + rate, 0) / breweries.length * 100).toFixed(1);

  return (
    <div className="data-analysis-container">
      <div className="analysis-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>📊 Comprehensive Data Analysis Report</h1>
        <p className="analysis-subtitle">
          Deep dive into brewery industry patterns, trends, and insights
        </p>
      </div>

      <div className="analysis-content">
        {/* Executive Summary */}
        <section className="analysis-section">
          <h2>📋 Executive Summary</h2>
          <div className="summary-stats">
            <div className="stat-card">
              <div className="stat-number">{totalBreweries.toLocaleString()}</div>
              <div className="stat-label">Total Breweries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(geographicData.countries).length}</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(geographicData.states).length}</div>
              <div className="stat-label">States/Provinces</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{digitalPresenceRate}%</div>
              <div className="stat-label">Have Websites</div>
            </div>
          </div>
          <div className="summary-text">
            <p>
              Our analysis of <strong>{totalBreweries.toLocaleString()} breweries</strong> reveals a dynamic and 
              diverse craft brewing industry spanning <strong>{Object.keys(geographicData.countries).length} countries</strong>. 
              The data shows clear patterns in business model preferences, geographic clustering, and digital adoption rates 
              that reflect the industry's evolution from traditional brewing to modern craft beer culture.
            </p>
          </div>
        </section>

        {/* Business Model Deep Dive */}
        <section className="analysis-section">
          <h2>🏭 Business Model Analysis</h2>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>Market Composition</h3>
              <div className="business-model-list">
                {sortedBusinessModels.map(([type, count]) => (
                  <div key={type} className="business-model-item">
                    <div className="model-info">
                      <span className="model-name">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <span className="model-count">{count} breweries</span>
                    </div>
                    <div className="model-bar">
                      <div 
                        className="model-fill" 
                        style={{ width: `${(count / totalBreweries) * 100}%` }}
                      ></div>
                    </div>
                    <span className="model-percentage">{((count / totalBreweries) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="analysis-card">
              <h3>Industry Insights</h3>
              <div className="insights-list">
                <div className="insight-item">
                  <strong>Dominant Model:</strong> {sortedBusinessModels[0][0].charAt(0).toUpperCase() + sortedBusinessModels[0][0].slice(1)} 
                  breweries represent {((sortedBusinessModels[0][1] / totalBreweries) * 100).toFixed(1)}% of the market, 
                  indicating a preference for {sortedBusinessModels[0][0] === 'micro' ? 'small-scale, artisanal production' : 'this business approach'}.
                </div>
                <div className="insight-item">
                  <strong>Market Fragmentation:</strong> The presence of {sortedBusinessModels.length} different business models 
                  shows a diverse ecosystem catering to various market segments and consumer preferences.
                </div>
                <div className="insight-item">
                  <strong>Growth Indicators:</strong> {businessModelData.planning || 0} breweries in planning phase suggest 
                  {businessModelData.planning > 10 ? 'strong continued growth' : 'steady market expansion'} in the industry.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic Analysis */}
        <section className="analysis-section">
          <h2>🗺️ Geographic Distribution Analysis</h2>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>International Presence</h3>
              <div className="geographic-list">
                {topCountries.map(([country, count]) => (
                  <div key={country} className="geo-item">
                    <span className="geo-name">{country}</span>
                    <span className="geo-count">{count} breweries ({((count / totalBreweries) * 100).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="analysis-card">
              <h3>Regional Concentration</h3>
              <div className="geographic-list">
                <h4>Top States/Provinces:</h4>
                {topStates.slice(0, 5).map(([state, count]) => (
                  <div key={state} className="geo-item">
                    <span className="geo-name">{state}</span>
                    <span className="geo-count">{count} breweries</span>
                  </div>
                ))}
              </div>
              <p className="geo-insight">
                <strong>Clustering Effect:</strong> Top 5 regions control {((topStates.slice(0,5).reduce((sum, [,count]) => sum + count, 0) / totalBreweries) * 100).toFixed(1)}% 
                of all breweries, indicating significant geographic clustering driven by factors like regulations, culture, and market size.
              </p>
            </div>
          </div>
        </section>

        {/* Digital Transformation Analysis */}
        <section className="analysis-section">
          <h2>🌐 Digital Transformation Analysis</h2>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>Overall Digital Adoption</h3>
              <div className="digital-stats">
                <div className="digital-stat">
                  <div className="digital-circle" style={{ background: `conic-gradient(#3b82f6 0% ${digitalPresenceRate}%, #e5e7eb ${digitalPresenceRate}% 100%)` }}>
                    <span className="digital-percentage">{digitalPresenceRate}%</span>
                  </div>
                  <span className="digital-label">Have Websites</span>
                </div>
                <div className="digital-stat">
                  <div className="digital-circle" style={{ background: `conic-gradient(#10b981 0% ${phoneAvailabilityRate}%, #e5e7eb ${phoneAvailabilityRate}% 100%)` }}>
                    <span className="digital-percentage">{phoneAvailabilityRate}%</span>
                  </div>
                  <span className="digital-label">Have Phone Numbers</span>
                </div>
              </div>
            </div>
            <div className="analysis-card">
              <h3>Digital Adoption by Business Type</h3>
              <div className="digital-by-type">
                {Object.entries(digitalByType).map(([type, data]) => (
                  <div key={type} className="digital-type-item">
                    <div className="type-header">
                      <span className="type-name">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <span className="type-percentage">{data.percentage}%</span>
                    </div>
                    <div className="type-bar">
                      <div 
                        className="type-fill" 
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data Quality Analysis */}
        <section className="analysis-section">
          <h2>📊 Data Quality & Completeness</h2>
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>Address Information Completeness</h3>
              <div className="quality-metric">
                <div className="quality-score">{avgAddressCompleteness}%</div>
                <p>Average address completeness across all brewery records</p>
              </div>
              <div className="quality-breakdown">
                {addressFields.map(field => {
                  const fieldCompleteness = (breweries.filter(b => b[field]).length / totalBreweries * 100).toFixed(1);
                  return (
                    <div key={field} className="quality-item">
                      <span className="quality-field">{field.replace('_', ' ').toUpperCase()}</span>
                      <span className="quality-percentage">{fieldCompleteness}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="analysis-card">
              <h3>Data Insights</h3>
              <div className="insights-list">
                <div className="insight-item">
                  <strong>Geographic Data:</strong> {((breweries.filter(b => b.latitude && b.longitude).length / totalBreweries) * 100).toFixed(1)}% 
                  of breweries have coordinates, enabling precise location-based analysis and mapping.
                </div>
                <div className="insight-item">
                  <strong>Contact Information:</strong> Phone availability at {phoneAvailabilityRate}% suggests varying 
                  approaches to customer accessibility across different brewery types.
                </div>
                <div className="insight-item">
                  <strong>Digital Presence:</strong> {digitalPresenceRate}% website adoption indicates the industry's 
                  {digitalPresenceRate > 70 ? 'strong' : 'evolving'} embrace of digital marketing and customer engagement.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="analysis-section">
          <h2>💡 Strategic Recommendations</h2>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <h3>🏭 For Brewery Operators</h3>
              <ul>
                <li>Consider digital presence investment - {digitalPresenceRate}% industry adoption rate</li>
                <li>Explore markets in top-performing regions for expansion opportunities</li>
                <li>Leverage business model insights for competitive positioning</li>
              </ul>
            </div>
            <div className="recommendation-card">
              <h3>📈 For Market Analysts</h3>
              <ul>
                <li>Focus on geographic clustering patterns for market entry strategies</li>
                <li>Monitor digital transformation trends across business types</li>
                <li>Track planning-phase breweries for growth forecasting</li>
              </ul>
            </div>
            <div className="recommendation-card">
              <h3>🔍 For Data Scientists</h3>
              <ul>
                <li>Improve data collection for {(100 - parseFloat(avgAddressCompleteness)).toFixed(1)}% missing address information</li>
                <li>Enhance geographic accuracy for location-based analytics</li>
                <li>Standardize business type classifications for better analysis</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DataAnalysisPage; 