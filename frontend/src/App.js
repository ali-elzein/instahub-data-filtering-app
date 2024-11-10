import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [filters, setFilters] = useState({
    device_id: '',
    timestamp_min: '',
    timestamp_max: '',
    temperature_min: '',
    temperature_max: '',
    humidity_min: '',
    humidity_max: '',
    light_min: '',
    light_max: '',
    motion_min: '',
    motion_max: ''
  });

  const [showSummary, setShowSummary] = useState(true);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSummaryToggle = () => {
    setShowSummary(!showSummary);
  };

  const handleSubmitFilters = () => {
    // Here you'd call the backend API with the filters.
    // Pass filters in the query string or request body based on the API design.
    console.log(filters);
  };

  return (
    <div className="container">
      <h1>Instahub Dashboard</h1>

      <div className="filters">
        <div>
          <label>Device ID</label>
          <input 
            type="text" 
            name="device_id" 
            value={filters.device_id} 
            onChange={handleFilterChange} 
          />
        </div>

        <div>
          <label>Timestamp</label>
          <input 
            type="datetime-local" 
            name="timestamp_min" 
            value={filters.timestamp_min} 
            onChange={handleFilterChange} 
          />
          <input 
            type="datetime-local" 
            name="timestamp_max" 
            value={filters.timestamp_max} 
            onChange={handleFilterChange} 
          />
        </div>

        <div>
          <label>Temperature</label>
          <input 
            type="number" 
            name="temperature_min" 
            placeholder="Min Temp" 
            value={filters.temperature_min} 
            onChange={handleFilterChange} 
          />
          <input 
            type="number" 
            name="temperature_max" 
            placeholder="Max Temp" 
            value={filters.temperature_max} 
            onChange={handleFilterChange} 
          />
        </div>

        <div>
          <label>Humidity</label>
          <input 
            type="number" 
            name="humidity_min" 
            placeholder="Min Humidity" 
            value={filters.humidity_min} 
            onChange={handleFilterChange} 
          />
          <input 
            type="number" 
            name="humidity_max" 
            placeholder="Max Humidity" 
            value={filters.humidity_max} 
            onChange={handleFilterChange} 
          />
        </div>

        <div>
          <label>Light</label>
          <input 
            type="number" 
            name="light_min" 
            placeholder="Min Light" 
            value={filters.light_min} 
            onChange={handleFilterChange} 
          />
          <input 
            type="number" 
            name="light_max" 
            placeholder="Max Light" 
            value={filters.light_max} 
            onChange={handleFilterChange} 
          />
        </div>

        <div>
          <label>Motion</label>
          <input 
            type="number" 
            name="motion_min" 
            placeholder="Min Motion" 
            value={filters.motion_min} 
            onChange={handleFilterChange} 
          />
          <input 
            type="number" 
            name="motion_max" 
            placeholder="Max Motion" 
            value={filters.motion_max} 
            onChange={handleFilterChange} 
          />
        </div>
      </div>

      <button className="summary-toggle" onClick={handleSummaryToggle}>
        {showSummary ? "Hide Summary" : "Show Summary"}
      </button>

      {showSummary && (
        <div className="summary">
          <h3>Summary</h3>
          <p>Total Records: 200</p>
          <p>Min Temperature: -10°C</p>
          <p>Max Temperature: 45°C</p>
          <p>Average Temperature: 25°C</p>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Timestamp</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Light</th>
              <th>Motion</th>
            </tr>
          </thead>
          <tbody>
            {/* Data rows go here */}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button>Prev</button>
        <span>Page 1 of 10</span>
        <button>Next</button>
      </div>

      {/* Button to trigger filter submission */}
      <button onClick={handleSubmitFilters}>Apply Filters</button>
    </div>
  );
};

export default App;
