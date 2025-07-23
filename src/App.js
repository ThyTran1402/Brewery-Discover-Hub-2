import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import DetailView from './components/DetailView';
import DataVisualization from './components/DataVisualization';
import DataAnalysisPage from './components/DataAnalysisPage';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import StateFilter from './components/StateFilter';
import CountryFilter from './components/CountryFilter';
import WebsiteFilter from './components/WebsiteFilter';
import CityFilter from './components/CityFilter';
import NameLengthFilter from './components/NameLengthFilter';
import BreweryList from './components/BreweryList';
import Statistics from './components/Statistics';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Multiple filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [websiteFilter, setWebsiteFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [nameLengthRange, setNameLengthRange] = useState({ min: 0, max: 100 });

  // Fetch breweries data using useEffect and async/await
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        if (!response.ok) {
          throw new Error('Failed to fetch brewery data');
        }
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data);
        
        // Set initial name length range based on actual data
        if (data.length > 0) {
          const nameLengths = data.map(brewery => brewery.name.length);
          const minLength = Math.min(...nameLengths);
          const maxLength = Math.max(...nameLengths);
          setNameLengthRange({ min: minLength, max: maxLength });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Comprehensive filtering logic - applies all filters simultaneously
  useEffect(() => {
    let filtered = breweries;

    // Filter by search term (name, city, state)
    if (searchTerm) {
      filtered = filtered.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.state_province.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brewery type
    if (selectedType !== 'all') {
      filtered = filtered.filter(brewery => brewery.brewery_type === selectedType);
    }

    // Filter by state
    if (selectedState !== 'all') {
      filtered = filtered.filter(brewery => brewery.state_province === selectedState);
    }

    // Filter by country
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(brewery => brewery.country === selectedCountry);
    }

    // Filter by website availability
    if (websiteFilter !== 'all') {
      if (websiteFilter === 'has_website') {
        filtered = filtered.filter(brewery => brewery.website_url);
      } else if (websiteFilter === 'no_website') {
        filtered = filtered.filter(brewery => !brewery.website_url);
      }
    }

    // Filter by city
    if (cityFilter) {
      filtered = filtered.filter(brewery =>
        brewery.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // Filter by name length range
    filtered = filtered.filter(brewery => {
      const nameLength = brewery.name.length;
      return nameLength >= nameLengthRange.min && nameLength <= nameLengthRange.max;
    });

    setFilteredBreweries(filtered);
  }, [breweries, searchTerm, selectedType, selectedState, selectedCountry, websiteFilter, cityFilter, nameLengthRange]);

  // Filter handlers
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleWebsiteFilterChange = (filter) => {
    setWebsiteFilter(filter);
  };

  const handleCityFilterChange = (city) => {
    setCityFilter(city);
  };

  const handleNameLengthChange = (range) => {
    setNameLengthRange(range);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedState('all');
    setSelectedCountry('all');
    setWebsiteFilter('all');
    setCityFilter('');
    // Reset name length to full range
    if (breweries.length > 0) {
      const nameLengths = breweries.map(brewery => brewery.name.length);
      const minLength = Math.min(...nameLengths);
      const maxLength = Math.max(...nameLengths);
      setNameLengthRange({ min: minLength, max: maxLength });
    }
  };

  // Dashboard Component - Your existing Project 5 functionality enhanced with Project 6 features
  const Dashboard = () => (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>🍺 Brewery Discover Hub</h1>
          <p>Explore breweries from around the world with real-time data & interactive visualizations</p>
        </div>
      </header>
      <main className="dashboard-main">
        <Statistics breweries={breweries} filteredBreweries={filteredBreweries} />
        
        {/* NEW PROJECT 6 FEATURE: Interactive Data Visualizations */}
        <DataVisualization breweries={breweries} filteredBreweries={filteredBreweries} />
        
        <div className="filters-section">
          <div className="filters-header">
            <h2>🔍 Advanced Filters</h2>
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          </div>
          
          <div className="filters-grid">
            <div className="filter-row">
              <SearchBar onSearchChange={handleSearchChange} />
              <CityFilter onCityFilterChange={handleCityFilterChange} />
            </div>
            
            <div className="filter-row">
              <CategoryFilter onTypeChange={handleTypeChange} selectedType={selectedType} />
              <StateFilter 
                breweries={breweries} 
                onStateChange={handleStateChange} 
                selectedState={selectedState} 
              />
              <CountryFilter 
                breweries={breweries} 
                onCountryChange={handleCountryChange} 
                selectedCountry={selectedCountry} 
              />
            </div>
            
            <div className="filter-row">
              <WebsiteFilter 
                onWebsiteFilterChange={handleWebsiteFilterChange} 
                websiteFilter={websiteFilter} 
              />
              <NameLengthFilter 
                breweries={breweries}
                onNameLengthChange={handleNameLengthChange}
                nameLengthRange={nameLengthRange}
              />
            </div>
          </div>
        </div>

        {/* Enhanced BreweryList with navigation links */}
        <BreweryList breweries={filteredBreweries} />
      </main>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading brewery data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Router>
      <div className="App">
        {/* NEW PROJECT 6 FEATURE: Persistent Sidebar */}
        <Sidebar />
        {/* NEW PROJECT 6 FEATURE: React Router with Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brewery/:id" element={<DetailView breweries={breweries} />} />
          <Route path="/analysis" element={<DataAnalysisPage breweries={breweries} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 