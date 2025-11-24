import React, { useState, useEffect } from "react";

const FilterSidebar = ({ onApplyFilters, categoryId=4 }) => {
  const [commonFilters, setCommonFilters] = useState({});
  const [categoryFilters, setCategoryFilters] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [locationName, setLocationName] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // 🔥 Load filters from backend when category changes
  useEffect(() => {
    if (!categoryId) return;

    fetch(`http://localhost:5000/api/categories/filters/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommonFilters(data.data.common_filters);
        setCategoryFilters(data.data.filters);
      })
      .catch((err) => console.error(err));
  }, [categoryId]);

  // 🔥 Handle selecting dynamic category fields
  const updateCategoryFilter = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      category_filters: {
        ...prev.category_filters,
        [field]: value,
      },
    }));
  };

  // 🔥 Detect Nearby Me
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setSelectedFilters((prev) => ({
          ...prev,
          latitude,
          longitude,
          radius: 10,
        }));

        setLocationName("Using current location");
        setLoadingLocation(false);
      },
      () => {
        alert("Unable to get location");
        setLoadingLocation(false);
      }
    );
  };

  // 🔥 Apply Filters
  const handleApply = () => {
    onApplyFilters(selectedFilters);
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter Listings</h3>
      </div>

      {/* ---------------- COMMON FILTERS ---------------- */}

      {/* Max Price */}
      {commonFilters?.max_price && (
        <div className="filter-section">
          <label>Max Price</label>
          <div className="price-range">
          <input
            type="range"
            min={commonFilters.max_price.min}
            max={commonFilters.max_price.max}
            step={commonFilters.max_price.step}
            value={selectedFilters.max_price || 0}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                max_price: e.target.value,
              }))
            }
          />
          <span>₹{selectedFilters.max_price || 0}</span>
          </div>
        </div>
      )}

      {/* Recently Added */}
      {commonFilters?.recently_added && (
        <div className="filter-section">
          <label>Recently Added</label>
          <button
            className={`filter-btn full-btn ${
              selectedFilters.recently_added ? "active" : ""
            }`}
            onClick={() =>
              setSelectedFilters((prev) => ({
                ...prev,
                recently_added: !prev.recently_added,
              }))
            }
          >
            {selectedFilters.recently_added ? "Showing Recent" : "Show Recent"}
          </button>
        </div>
      )}

      {/* Nearby Me */}
      {commonFilters?.nearby_me && (
        <div className="filter-section">
          <label>Nearby Me</label>
          <button
            className="filter-btn full-btn"
            onClick={handleUseCurrentLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Detecting..." : "Within 10 km"}
          </button>

          {locationName && <p className="current-location">📍 {locationName}</p>}
        </div>
      )}

      {/* ---------------- CATEGORY FILTERS ---------------- */}
      {categoryFilters.map((field) => (
        <div className="filter-section" key={field.field_name}>
          <label>{field.label}</label>

          {/* TEXT INPUT */}
          {field.type === "text" && (
            <input
              type="text"
              className="filter-select"
              placeholder={field.placeholder}
              onChange={(e) =>
                updateCategoryFilter(field.field_name, e.target.value)
              }
            />
          )}

          {/* NUMBER */}
          {field.type === "number" && (
            <input
              type="number"
              className="filter-select"
              onChange={(e) =>
                updateCategoryFilter(field.field_name, e.target.value)
              }
            />
          )}

          {/* SELECT */}
          {field.type === "select" && (
            <select
              className="filter-select"
              onChange={(e) =>
                updateCategoryFilter(field.field_name, e.target.value)
              }
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {/* CHECKBOX */}
          {field.type === "checkbox" && (
            <div className="checkbox-group">
              {field.options?.map((opt, i) => (
                <label key={i} className="checkbox-item">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      updateCategoryFilter(field.field_name, opt)
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* APPLY BUTTON */}
      <button className="view-btn" onClick={handleApply}>
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
