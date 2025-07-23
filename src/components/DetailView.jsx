import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailView.css';

function DetailView({ breweries }) {
  const { id } = useParams(); // Extract brewery ID from URL
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findBrewery = () => {
      setLoading(true);
      
      if (breweries && breweries.length > 0) {
        // Find brewery in the existing data
        const foundBrewery = breweries.find(b => b.id === id);
        if (foundBrewery) {
          setBrewery(foundBrewery);
          setError(null);
        } else {
          setError('Brewery not found');
        }
      } else {
        // If breweries not loaded yet, try to fetch this specific brewery
        fetchBreweryById(id);
      }
      setLoading(false);
    };

    const fetchBreweryById = async (breweryId) => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${breweryId}`);
        if (!response.ok) {
          throw new Error('Brewery not found');
        }
        const data = await response.json();
        setBrewery(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    findBrewery();
  }, [id, breweries]);

  if (loading) {
    return <div className="loading">Loading brewery details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">Error: {error}</div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    );
  }

  if (!brewery) {
    return (
      <div className="error-container">
        <div className="error">Brewery not found</div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    );
  }

  // Helper functions for formatting data
  const formatAddress = (brewery) => {
    const parts = [];
    if (brewery.address_1) parts.push(brewery.address_1);
    if (brewery.address_2) parts.push(brewery.address_2);
    if (brewery.address_3) parts.push(brewery.address_3);
    if (brewery.city) parts.push(brewery.city);
    if (brewery.state_province) parts.push(brewery.state_province);
    if (brewery.postal_code) parts.push(brewery.postal_code);
    if (brewery.country) parts.push(brewery.country);
    return parts.join(', ');
  };

  const formatPhone = (phone) => {
    if (!phone) return null;
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getTypeColor = (type) => {
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
  };

  const getTypeDescription = (type) => {
    const descriptions = {
      micro: 'Small-scale brewery producing limited quantities of beer, typically selling to local markets',
      nano: 'Very small brewery, often operated as a hobby or small business venture',
      regional: 'Medium-scale brewery distributing beer regionally with broader market reach',
      brewpub: 'Restaurant-brewery hybrid serving food and beer brewed on-premises',
      large: 'Industrial-scale brewery with mass production and wide distribution networks',
      planning: 'Brewery in planning phase, not yet operational',
      contract: 'Business model where brewing is contracted to another facility',
      proprietor: 'Contract manufacturing arrangement for brewery operations',
      closed: 'Brewery that has ceased operations'
    };
    return descriptions[type] || 'Brewery type information not available';
  };

  return (
    <div className="detail-view-container">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1 className="brewery-title">{brewery.name}</h1>
        <span 
          className="brewery-type-badge large"
          style={{ backgroundColor: getTypeColor(brewery.brewery_type) }}
        >
          {brewery.brewery_type?.charAt(0).toUpperCase() + brewery.brewery_type?.slice(1)}
        </span>
      </div>

      <div className="detail-content">
        {/* Business Overview - Extra info not on dashboard */}
        <div className="detail-section">
          <h2>🏭 Business Overview</h2>
          <div className="detail-info">
            <p><strong>Business Type:</strong> {brewery.brewery_type?.charAt(0).toUpperCase() + brewery.brewery_type?.slice(1)}</p>
            <p className="type-description">{getTypeDescription(brewery.brewery_type)}</p>
            <p><strong>Brewery ID:</strong> {brewery.id}</p>
            {brewery.created_at && (
              <p><strong>Added to Database:</strong> {new Date(brewery.created_at).toLocaleDateString()}</p>
            )}
            {brewery.updated_at && (
              <p><strong>Last Updated:</strong> {new Date(brewery.updated_at).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Location Information - Enhanced details */}
        <div className="detail-section">
          <h2>📍 Location Details</h2>
          <div className="detail-info">
            <p><strong>Complete Address:</strong></p>
            <address className="brewery-address">
              {formatAddress(brewery) || 'Address not available'}
            </address>
            
            <div className="location-grid">
              <div className="location-item">
                <strong>City:</strong> {brewery.city || 'Not specified'}
              </div>
              <div className="location-item">
                <strong>State/Province:</strong> {brewery.state_province || 'Not specified'}
              </div>
              <div className="location-item">
                <strong>Country:</strong> {brewery.country || 'Not specified'}
              </div>
              {brewery.postal_code && (
                <div className="location-item">
                  <strong>Postal Code:</strong> {brewery.postal_code}
                </div>
              )}
            </div>

            {brewery.latitude && brewery.longitude && (
              <div className="coordinates">
                <p><strong>Geographic Coordinates:</strong></p>
                <p>Latitude: {brewery.latitude}, Longitude: {brewery.longitude}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="detail-section">
          <h2>📞 Contact Information</h2>
          <div className="detail-info">
            {brewery.phone ? (
              <p><strong>Phone:</strong> <a href={`tel:${brewery.phone}`} className="phone-link">{formatPhone(brewery.phone)}</a></p>
            ) : (
              <p><strong>Phone:</strong> Not available</p>
            )}
            
            {brewery.website_url ? (
              <p>
                <strong>Website:</strong> 
                <a 
                  href={brewery.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  {brewery.website_url}
                </a>
              </p>
            ) : (
              <p><strong>Website:</strong> Not available</p>
            )}
          </div>
        </div>

        {/* Additional Features - Extra info not shown on dashboard */}
        <div className="detail-section">
          <h2>ℹ️ Additional Information</h2>
          <div className="detail-info">
            <div className="info-grid">
              <div className="info-item">
                <strong>Establishment Status:</strong>
                <span className={`status ${brewery.brewery_type}`}>
                  {brewery.brewery_type === 'planning' ? 'In Planning' : 
                   brewery.brewery_type === 'closed' ? 'Closed' : 'Active'}
                </span>
              </div>
              
              <div className="info-item">
                <strong>Digital Presence:</strong>
                <span className={brewery.website_url ? 'has-website' : 'no-website'}>
                  {brewery.website_url ? 'Has Online Presence' : 'No Website Listed'}
                </span>
              </div>
              
              <div className="info-item">
                <strong>Contact Availability:</strong>
                <span className={brewery.phone ? 'has-phone' : 'no-phone'}>
                  {brewery.phone ? 'Phone Available' : 'No Phone Listed'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Actions - Enhanced features */}
        {brewery.latitude && brewery.longitude && (
          <div className="detail-section">
            <h2>🗺️ Location Services</h2>
            <div className="detail-info">
              <div className="action-buttons">
                <a
                  href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn maps-btn"
                >
                  📍 View on Google Maps
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${brewery.latitude},${brewery.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn directions-btn"
                >
                  🧭 Get Directions
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailView; 