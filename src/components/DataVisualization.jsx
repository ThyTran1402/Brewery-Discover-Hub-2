import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import './DataVisualization.css';

function DataVisualization({ breweries, filteredBreweries }) {
  // STRETCH FEATURE: Toggle controls for visualizations
  const [visibleCharts, setVisibleCharts] = useState({
    businessModel: true,
    geographic: true,
    digitalPresence: true,
    globalReach: true
  });
  
  const [viewMode, setViewMode] = useState('all'); // 'all', 'business', 'geographic', 'digital'
  const [showInsights, setShowInsights] = useState(true);
  const [showFilterSuggestions, setShowFilterSuggestions] = useState(true);

  if (!breweries || breweries.length === 0) {
    return (
      <div className="visualization-loading">
        <p>Loading data visualizations...</p>
      </div>
    );
  }

  const dataToUse = filteredBreweries || breweries;

  // Chart 1: Brewery Types Distribution (Bar Chart) - Shows business model diversity
  const breweryTypeData = dataToUse.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.entries(breweryTypeData)
    .map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      fill: getTypeColor(type)
    }))
    .sort((a, b) => b.count - a.count);

  // Chart 2: Geographic Distribution - Top States/Provinces (Horizontal Bar Chart)
  const stateData = dataToUse.reduce((acc, brewery) => {
    const state = brewery.state_province || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const topStatesData = Object.entries(stateData)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Chart 3: Digital Presence Analysis (Area Chart) - Website availability by brewery type
  const websiteAnalysis = () => {
    const typeWebsiteData = {};
    
    dataToUse.forEach(brewery => {
      const type = brewery.brewery_type || 'unknown';
      if (!typeWebsiteData[type]) {
        typeWebsiteData[type] = { total: 0, withWebsite: 0 };
      }
      typeWebsiteData[type].total++;
      if (brewery.website_url) {
        typeWebsiteData[type].withWebsite++;
      }
    });

    return Object.entries(typeWebsiteData)
      .map(([type, data]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        total: data.total,
        withWebsite: data.withWebsite,
        percentage: Math.round((data.withWebsite / data.total) * 100)
      }))
      .sort((a, b) => b.total - a.total);
  };

  const websiteData = websiteAnalysis();

  // Chart 4: Country Distribution (Pie Chart) - Global brewery presence
  const countryData = dataToUse.reduce((acc, brewery) => {
    const country = brewery.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const countryChartData = Object.entries(countryData).map(([country, count], index) => ({
    name: country,
    value: count,
    fill: `hsl(${index * 60}, 70%, 60%)`
  }));

  // STRETCH FEATURE: Enhanced data analysis and filter suggestions
  const getFilterSuggestions = () => {
    const suggestions = [];
    
    if (typeChartData.length > 0) {
      const dominantType = typeChartData[0];
      suggestions.push({
        icon: '🏭',
        title: `Explore ${dominantType.type} Breweries`,
        description: `${dominantType.type} breweries dominate with ${dominantType.count} locations. Filter by this type to understand regional patterns.`,
        filter: 'brewery_type',
        value: dominantType.type.toLowerCase()
      });
    }
    
    if (topStatesData.length > 0) {
      const topState = topStatesData[0];
      suggestions.push({
        icon: '🗺️',
        title: `Focus on ${topState.state}`,
        description: `${topState.state} leads with ${topState.count} breweries. Explore this brewery capital's distribution.`,
        filter: 'state',
        value: topState.state
      });
    }
    
    const digitalAdoptionRate = Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100);
    if (digitalAdoptionRate < 70) {
      suggestions.push({
        icon: '🌐',
        title: 'Digital Presence Analysis',
        description: `Only ${digitalAdoptionRate}% have websites. Filter by "Has Website" to see digitally advanced breweries.`,
        filter: 'website',
        value: 'yes'
      });
    }
    
    return suggestions;
  };

  const filterSuggestions = getFilterSuggestions();

  // STRETCH FEATURE: Toggle functions
  const toggleChart = (chartKey) => {
    setVisibleCharts(prev => ({
      ...prev,
      [chartKey]: !prev[chartKey]
    }));
  };

  const setViewModeHandler = (mode) => {
    setViewMode(mode);
    
    // Automatically show/hide charts based on view mode
    switch(mode) {
      case 'business':
        setVisibleCharts({
          businessModel: true,
          geographic: false,
          digitalPresence: true,
          globalReach: false
        });
        break;
      case 'geographic':
        setVisibleCharts({
          businessModel: false,
          geographic: true,
          digitalPresence: false,
          globalReach: true
        });
        break;
      case 'digital':
        setVisibleCharts({
          businessModel: false,
          geographic: false,
          digitalPresence: true,
          globalReach: false
        });
        break;
      default: // 'all'
        setVisibleCharts({
          businessModel: true,
          geographic: true,
          digitalPresence: true,
          globalReach: true
        });
    }
  };

  function getTypeColor(type) {
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
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="data-visualization-container">
      <div className="viz-header">
        <h2>📊 Interactive Data Insights & Visualizations</h2>
        <p className="viz-subtitle">
          {dataToUse.length === breweries.length 
            ? 'Analyzing all brewery data' 
            : `Analyzing ${dataToUse.length} filtered results`}
        </p>
        
        {/* STRETCH FEATURE: View Mode Controls */}
        <div className="view-controls">
          <div className="view-mode-selector">
            <h3>📈 View Mode</h3>
            <div className="mode-buttons">
              <button 
                className={`mode-btn ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => setViewModeHandler('all')}
              >
                <span className="btn-icon">📊</span>
                All Charts
              </button>
              <button 
                className={`mode-btn ${viewMode === 'business' ? 'active' : ''}`}
                onClick={() => setViewModeHandler('business')}
              >
                <span className="btn-icon">🏭</span>
                Business Analysis
              </button>
              <button 
                className={`mode-btn ${viewMode === 'geographic' ? 'active' : ''}`}
                onClick={() => setViewModeHandler('geographic')}
              >
                <span className="btn-icon">🗺️</span>
                Geographic Analysis
              </button>
              <button 
                className={`mode-btn ${viewMode === 'digital' ? 'active' : ''}`}
                onClick={() => setViewModeHandler('digital')}
              >
                <span className="btn-icon">🌐</span>
                Digital Analysis
              </button>
            </div>
          </div>
          
          {/* Individual Chart Toggles */}
          <div className="chart-toggles">
            <h3>🔧 Toggle Charts</h3>
            <div className="toggle-buttons">
              <button 
                className={`toggle-btn ${visibleCharts.businessModel ? 'active' : ''}`}
                onClick={() => toggleChart('businessModel')}
              >
                🏭 Business Models
              </button>
              <button 
                className={`toggle-btn ${visibleCharts.geographic ? 'active' : ''}`}
                onClick={() => toggleChart('geographic')}
              >
                🗺️ Geographic Hotspots
              </button>
              <button 
                className={`toggle-btn ${visibleCharts.digitalPresence ? 'active' : ''}`}
                onClick={() => toggleChart('digitalPresence')}
              >
                🌐 Digital Presence
              </button>
              <button 
                className={`toggle-btn ${visibleCharts.globalReach ? 'active' : ''}`}
                onClick={() => toggleChart('globalReach')}
              >
                🌍 Global Reach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STRETCH FEATURE: Filter Suggestions */}
      {showFilterSuggestions && (
        <div className="filter-suggestions">
          <div className="suggestions-header">
            <h3>💡 Smart Filter Suggestions</h3>
            <button 
              className="close-btn"
              onClick={() => setShowFilterSuggestions(false)}
            >
              ✕
            </button>
          </div>
          <p className="suggestions-subtitle">Based on current data analysis, try these filters to discover interesting patterns:</p>
          <div className="suggestions-grid">
            {filterSuggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-card">
                <div className="suggestion-icon">{suggestion.icon}</div>
                <div className="suggestion-content">
                  <h4>{suggestion.title}</h4>
                  <p>{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="charts-grid">
        {/* Chart 1: Business Model Analysis */}
        {visibleCharts.businessModel && (
          <div className="chart-container">
            <div className="chart-header">
              <h3>🏭 Brewery Business Models</h3>
              <div className="chart-annotations">
                <span className="annotation">📈 Market Distribution</span>
                <span className="annotation">🎯 {typeChartData[0]?.count || 0} Leading Type</span>
              </div>
            </div>
            <div className="chart-description">
              <p><strong>What's interesting:</strong> This reveals the craft beer industry's business model preferences. 
              <strong>Micro breweries</strong> typically dominate, showing the industry's artisanal focus.</p>
              <p><strong>Filter tip:</strong> Select a specific brewery type to explore regional concentrations and digital adoption patterns.</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 2: Geographic Analysis */}
        {visibleCharts.geographic && (
          <div className="chart-container">
            <div className="chart-header">
              <h3>🗺️ Brewery Hotspots</h3>
              <div className="chart-annotations">
                <span className="annotation">🏆 Top Regions</span>
                <span className="annotation">📍 {topStatesData.length} Active Areas</span>
              </div>
            </div>
            <div className="chart-description">
              <p><strong>What's interesting:</strong> Geographic clustering reveals cultural beer preferences and regulatory environments. 
              States like <strong>California, Colorado, and Oregon</strong> often lead due to craft beer-friendly laws.</p>
              <p><strong>Filter tip:</strong> Focus on top states to understand local brewery ecosystems and discover regional brewing styles.</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={topStatesData} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="state" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 3: Digital Presence Analysis */}
        {visibleCharts.digitalPresence && (
          <div className="chart-container">
            <div className="chart-header">
              <h3>🌐 Digital Presence by Business Type</h3>
              <div className="chart-annotations">
                <span className="annotation">💻 Tech Adoption</span>
                <span className="annotation">📊 {Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100)}% Online</span>
              </div>
            </div>
            <div className="chart-description">
              <p><strong>What's interesting:</strong> Digital adoption varies dramatically by business model. 
              <strong>Larger breweries</strong> typically have higher website adoption, while <strong>nano breweries</strong> may rely more on social media.</p>
              <p><strong>Filter tip:</strong> Compare "Has Website" vs "No Website" to see how digital presence correlates with business size and location.</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={websiteData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                  name="Website %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart 4: Global Distribution */}
        {visibleCharts.globalReach && (
          <div className="chart-container">
            <div className="chart-header">
              <h3>🌍 Global Brewery Distribution</h3>
              <div className="chart-annotations">
                <span className="annotation">🌎 International Reach</span>
                <span className="annotation">🏳️ {Object.keys(countryData).length} Countries</span>
              </div>
            </div>
            <div className="chart-description">
              <p><strong>What's interesting:</strong> While craft brewing started in specific regions, it's now a global phenomenon. 
              The <strong>US often dominates</strong> due to data source bias, but international growth is significant.</p>
              <p><strong>Filter tip:</strong> Select different countries to explore how brewery types and digital adoption vary by region and culture.</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {countryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Enhanced Data Insights */}
      {showInsights && (
        <div className="insights-summary">
          <div className="insights-header">
            <h3>🔍 Advanced Market Intelligence</h3>
            <button 
              className="close-btn"
              onClick={() => setShowInsights(false)}
            >
              ✕
            </button>
          </div>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>🏭 Business Model Insights</h4>
              <p>
                <strong>{typeChartData[0]?.type}</strong> breweries lead with {typeChartData[0]?.count} locations ({Math.round((typeChartData[0]?.count / dataToUse.length) * 100)}% market share). 
                This suggests the industry favors <em>{typeChartData[0]?.type.toLowerCase() === 'micro' ? 'artisanal, small-batch production' : 'this specific business approach'}</em>.
              </p>
            </div>
            <div className="insight-card">
              <h4>🗺️ Geographic Concentration</h4>
              <p>
                <strong>{topStatesData[0]?.state}</strong> dominates with {topStatesData[0]?.count} breweries. 
                The top 3 states control {Math.round((topStatesData.slice(0,3).reduce((sum, state) => sum + state.count, 0) / dataToUse.length) * 100)}% of locations, 
                indicating <em>regional clustering</em> due to favorable regulations or beer culture.
              </p>
            </div>
            <div className="insight-card">
              <h4>🌐 Digital Transformation</h4>
              <p>
                {Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100)}% have established web presence. 
                This {Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100) > 70 ? 'high' : 'moderate'} adoption rate suggests the industry is 
                <em>{Math.round((dataToUse.filter(b => b.website_url).length / dataToUse.length) * 100) > 70 ? 'embracing digital marketing' : 'still developing digital strategies'}</em>.
              </p>
            </div>
            <div className="insight-card">
              <h4>🌍 Global Expansion</h4>
              <p>
                {Object.keys(countryData).length} countries represented shows <em>international craft beer growth</em>. 
                Beyond traditional markets, craft brewing is spreading globally, with each region developing unique characteristics and preferences.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataVisualization; 