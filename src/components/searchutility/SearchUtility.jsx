import React, { useState, useCallback, memo } from 'react';
import './SearchUtility.css';

// Memoized Tag Component for performance
const RecommendationTag = memo(({ label, onClick }) => (
  <button 
    type="button"
    className="search-utility__tag" 
    onClick={() => onClick(label)}
  >
    {label}
  </button>
));

export default function SearchUtility() {
  // 1. State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Select Location');
  const recommendations = ['Dermatologist', 'Gynecologist', 'Paediatrician', 'Orthopaedic', 'Dentist'];

  // 2. Logic Handlers
  const handleSearch = useCallback((e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    console.log('Searching for:', searchQuery, 'in', location);
    // Integration point: onSearch({ query: searchQuery, loc: location })
  }, [searchQuery, location]);

  const handleTagClick = useCallback((tag) => {
    setSearchQuery(tag);
    // Optional: Auto-trigger search when a tag is clicked
    console.log('Tag selected:', tag);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-utility">
      <div className="search-utility__container">
        
        {/* Figma Search Box Card */}
        <div className="search-utility__card">
          
          {/* Location Dropdown selector */}
          <div 
            className="search-utility__field search-utility__field--location"
            onClick={() => console.log('Open Location Modal')}
            role="button"
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-utility__icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="search-utility__location-text">{location}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-utility__chevron">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Clean Vertical Line Divider */}
          <div className="search-utility__divider"></div>

          {/* Search Input Field */}
          <div className="search-utility__field search-utility__field--input">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-utility__icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search Doctors, Specialities, Clinics and Hospitals..." 
              className="search-utility__input-el"
              aria-label="Search healthcare"
            />
          </div>

          {/* Action CTA search button */}
          <button 
            type="submit"
            onClick={handleSearch}
            className="search-utility__btn"
          >
            Search
          </button>
        </div>

        {/* Popular Searches Row */}
        <div className="search-utility__keywords">
          <span className="search-utility__keywords-title">Popular Searches:</span>
          <div className="search-utility__tags-container">
            {recommendations.map((item) => (
              <RecommendationTag 
                key={item} 
                label={item} 
                onClick={handleTagClick} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}