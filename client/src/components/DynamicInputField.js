import React, { useState } from "react";
import "../forms/styles/AddForm.css";
import MapModal from "../forms/AddForm/MapModal";
import { FaLocationDot } from "react-icons/fa6";
// import MapModal from "./MapModal";

const DynamicInputField = ({ field, handleChangeField, value, handleMapSelect  }) => {
  const fieldName = field.field_name || field.name;
  const [showMap, setShowMap] = useState(false);
  const [ loadingLocation, setLoadingLocation] = useState(false);

  let options = [];
  try {
    if (typeof field.options === "string") {
      options = JSON.parse(field.options);
    } else if (Array.isArray(field.options)) {
      options = field.options;
    }
  } catch (err) {
    console.warn(`⚠️ Invalid options for field ${fieldName}`);
  }

  const isLocationField = ["from_location", "to_location"].includes(fieldName.toLowerCase());
  const displayAddress = typeof value === "object" ? value.address || "" : value || "";
  

  return (
    <div className="cf-input-group">
      {/* 🔹 FROM / TO Fields with Location Button */}
      {isLocationField ? (
        <>
          <div className="cf-location-field for-maps">
            <input
              type="text"
              name={fieldName}
              className="cf-input"
              placeholder="Enter or select location"
              value={displayAddress}
              onChange={(e) =>
                handleChangeField({
                  target: {
                    name: fieldName,
                    value: {
                      ...value,
                      address: e.target.value,
                      lat: value?.lat || null,
                      lng: value?.lng || null,
                    },
                  },
                })
              }
            />
            <button
              type="button"
              className="cf-location-icon-btn"
              onClick={() => setShowMap(true)}
            >
              {loadingLocation ? <div className="cf-loader"></div> : <FaLocationDot />}
            </button>
          </div>

          {showMap && (
             <MapModal
              setMapVisible={setShowMap}
              setAddress={(addr) =>
                handleMapSelect(fieldName, { ...value, address: addr })
              }
              setLoadingLocation={setLoadingLocation}
              setMarkerPosition={(pos) =>
                handleMapSelect(fieldName, {
                  lat: pos[0],
                  lng: pos[1],
                  address: pos[2],
                })
              }
            />
          )}
        </>
      ) : null}

      {/* 🔹 TEXT / NUMBER / DATE */}
      {!isLocationField && ["text", "number", "date"].includes(field.input_type) && (
        <>
          <input
            type={field.input_type}
            name={fieldName}
            className="cf-input"
            placeholder=" "
            required={field.required}
            onChange={handleChangeField}
            value={value}
          />
          <label className="cf-label">{field.label || fieldName}</label>
          <span className="cf-underline"></span>
        </>
      )}

      {/* 🔹 SELECT */}
      {!isLocationField && field.input_type === "select" && (
        <>
          <select
            name={fieldName}
            className="cf-select"
            required={field.required}
            onChange={handleChangeField}
            value={value}
          >
            <option value="">Select {field.label || fieldName}</option>
            {options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="cf-underline"></span>
        </>
      )}

      {/* 🔹 TEXTAREA */}
      {!isLocationField && field.input_type === "textarea" && (
        <>
          <textarea 
            name={fieldName}
            className="cf-textarea"
            placeholder=" "
            required={field.required}
            onChange={handleChangeField}
            value={value}
          ></textarea>
          <label className="cf-label">{field.label || fieldName}</label>
          <span className="cf-underline"></span>
        </>
      )}
    </div>
  );
};

export default DynamicInputField;
