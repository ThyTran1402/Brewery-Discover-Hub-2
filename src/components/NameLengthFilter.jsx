import React, { useState, useEffect } from 'react';
import './NameLengthFilter.css';

function NameLengthFilter({ breweries, onNameLengthChange, nameLengthRange }) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [absoluteMin, setAbsoluteMin] = useState(0);
  const [absoluteMax, setAbsoluteMax] = useState(100);

  // Calculate the absolute min and max from brewery data
  useEffect(() => {
    if (breweries.length > 0) {
      const nameLengths = breweries.map(brewery => brewery.name.length);
      const min = Math.min(...nameLengths);
      const max = Math.max(...nameLengths);
      setAbsoluteMin(min);
      setAbsoluteMax(max);
      setMinValue(nameLengthRange.min);
      setMaxValue(nameLengthRange.max);
    }
  }, [breweries, nameLengthRange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onNameLengthChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onNameLengthChange({ min: minValue, max: value });
  };

  const handleMinInputChange = (e) => {
    const value = Math.max(absoluteMin, Math.min(Number(e.target.value), maxValue - 1));
    setMinValue(value);
    onNameLengthChange({ min: value, max: maxValue });
  };

  const handleMaxInputChange = (e) => {
    const value = Math.min(absoluteMax, Math.max(Number(e.target.value), minValue + 1));
    setMaxValue(value);
    onNameLengthChange({ min: minValue, max: value });
  };

  return (
    <div className="name-length-filter-container">
      <label className="filter-label">
        📏 Brewery Name Length
      </label>
      
      <div className="slider-container">
        <div className="range-inputs">
          <div className="range-input-group">
            <label htmlFor="min-length">Min:</label>
            <input
              id="min-length"
              type="number"
              min={absoluteMin}
              max={absoluteMax}
              value={minValue}
              onChange={handleMinInputChange}
              className="range-input"
            />
          </div>
          
          <div className="range-input-group">
            <label htmlFor="max-length">Max:</label>
            <input
              id="max-length"
              type="number"
              min={absoluteMin}
              max={absoluteMax}
              value={maxValue}
              onChange={handleMaxInputChange}
              className="range-input"
            />
          </div>
        </div>
        
        <div className="dual-range-slider">
          <input
            type="range"
            min={absoluteMin}
            max={absoluteMax}
            value={minValue}
            onChange={handleMinChange}
            className="range-slider range-slider-min"
          />
          <input
            type="range"
            min={absoluteMin}
            max={absoluteMax}
            value={maxValue}
            onChange={handleMaxChange}
            className="range-slider range-slider-max"
          />
        </div>
        
        <div className="range-display">
          <span className="range-value">{minValue}</span>
          <span className="range-separator">-</span>
          <span className="range-value">{maxValue}</span>
          <span className="range-unit">characters</span>
        </div>
      </div>
      
      <div className="filter-hint">
        Filter by brewery name length ({absoluteMin}-{absoluteMax} characters)
      </div>
    </div>
  );
}

export default NameLengthFilter; 