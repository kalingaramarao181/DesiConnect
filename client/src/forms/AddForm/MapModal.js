import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapModal = ({ setMapVisible, setAddress, setMarkerPosition, setLoadingLocation }) => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default: India
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Reverse Geocode via your backend proxy (to avoid CORS)
  const reverseGeocode = async (lat, lon) => {
    try {
      setLoadingLocation(true);
      const res = await fetch(`http://localhost:5000/api/reverse-geocode?lat=${lat}&lon=${lon}`);
      const data = await res.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
        console.log(data.display_name);
        setMarkerPosition([lat, lon, data.display_name]);
        
      } else {
        setMarkerPosition([lat, lon, "Unknown location"]);
      }

      setMarkerPosition([lat, lon]);
    } catch (err) {
      console.error("Reverse geocode failed:", err);
      setAddress("Unable to fetch address");
    } finally {
      setLoadingLocation(false);
    }
  };

  // ✅ Handle “Use Current Location”
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setMarker([latitude, longitude]);
        reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to get your current location.");
        setLoading(false);
      }
    );
  };

  // ✅ Allow user to click on map to select location
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });
    return marker ? <Marker position={marker} /> : null;
  }

  return (
    <div className="cf-map-modal">
      <div className="cf-map-box">
        <h3>Select Location</h3>

        <div className="cf-map-buttons">
          <button
            onClick={handleCurrentLocation}
            className="cf-current-btn"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Use Current Location"}
          </button>

          <button
            onClick={() => setMapVisible(false)}
            className="cf-close-map-btn"
          >
            ✕ Close
          </button>
        </div>

        <MapContainer
          center={position}
          zoom={marker ? 13 : 5}
          style={{
            height: "350px",
            width: "100%",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapModal;
