import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapModal = ({ setMapVisible, setAddress, setMarkerPosition }) => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // India default
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Reverse geocode selected coordinates
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}& =json`
      );
      const data = await res.json();
      const addr = data.display_name || "Unknown location";
      setAddress(addr);
      setMarkerPosition([lat, lon]);
    } catch (err) {
      console.error("Reverse geocode failed:", err);
    }
  };

  // 🔹 Handle current location
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

  // 🔹 Map click to choose location
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (lat && lng) {
          setMarker([lat, lng]);
          reverseGeocode(lat, lng);
        }
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
            attribution='© OpenStreetMap'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapModal;
