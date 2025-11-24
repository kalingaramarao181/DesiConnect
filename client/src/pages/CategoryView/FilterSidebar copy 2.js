import React, { useState } from "react";

const FilterSidebar = ({ onApplyFilters, category = "All Listings" }) => {
  const [listingType, setListingType] = useState(""); 
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [activeOnly, setActiveOnly] = useState(true);

  const locationOptions = [
  "New York",
  "San Francisco",
  "Washington",
  "Mountain View",
  "Los Angeles",
  "Chicago",
  "Dallas",
  "Houston",
];

  // ✅ Detect current location for "Nearby Me"
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const addr = data.address;

          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.state_district ||
            addr.state ||
            addr.county ||
            addr.country;

          setLocation(city || "Unknown");
        } catch (error) {
          console.error(error);
          alert("Unable to fetch location details.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        alert("Unable to access location.");
        setLoadingLocation(false);
      }
    );
  };

  // ✅ Apply Filters button click
  const handleApply = () => {
    const filters = {};

    if (listingType) filters.type = listingType;
    if (priceRange) filters.price_max = priceRange;
    if (priceRange) filters.price_min = 0;
    if (location) filters.location = location;
    if (recentlyAdded) filters.recent = 1;
    if (activeOnly) filters.status = "active";

    onApplyFilters(filters);
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter Listings</h3>
        <p className="category-type">{category}</p>
      </div>

      {/* Buy / Rent Buttons */}
      <div className="filter-section">
        <label>Listing Type</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${listingType === "Private" ? "active" : ""}`}
            onClick={() => setListingType("Private")}
          >
            Private
          </button>
          <button
            className={`filter-btn ${listingType === "Shared" ? "active" : ""}`}
            onClick={() => setListingType("Shared")}
          >
            Shared
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <label>Max Price</label>
        <div className="price-range">
          <span>$0</span>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={priceRange || 0}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <span>${priceRange || 0}</span>
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="filter-section">
        <label>Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Location</option>
          {locationOptions.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Nearby Me */}
      <div className="filter-section">
        <label>Nearby Me</label>
        <button
          className="filter-btn full-btn"
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? "Detecting..." : "Within 10 km"}
        </button>
        {location && <p className="current-location">📍 {location}</p>}
      </div>

      {/* Recently Added */}
      <div className="filter-section">
        <label>Recently Added</label>
        <button
          className={`filter-btn full-btn ${
            recentlyAdded ? "active" : ""
          }`}
          onClick={() => setRecentlyAdded(!recentlyAdded)}
        >
          {recentlyAdded ? "Showing Recent" : "Show Recently Added"}
        </button>
      </div>

      {/* Active Listings */}
      <div className="filter-section">
        <label>Status</label>
        <button
          className={`filter-btn full-btn ${activeOnly ? "active" : ""}`}
          onClick={() => setActiveOnly(!activeOnly)}
        >
          {activeOnly ? "Active Only" : "Show All Listings"}
        </button>
      </div>

      <button className="view-btn" onClick={handleApply}>
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
