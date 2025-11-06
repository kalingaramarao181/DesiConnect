import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdDetailsById } from "../api/AdApi";
import { baseUrlImg } from "../Config/env";
import "./styles/AdDetailsPage.css";

const AdDetailsPage = () => {
  const { adId } = useParams(); // ✅ Get ad ID from URL
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        setLoading(true);
        const res = await getAdDetailsById(adId);
        if (res?.data) {
          setAd(res.data);
        } else {
          setError("Ad not found");
        }
      } catch (err) {
        console.error("Error fetching ad details:", err);
        setError("Failed to load ad details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [adId]);

  if (loading) return <div className="loading">Loading ad details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ad) return null;

  // ✅ Parse location and fields safely
  let locationData = {};
  let extraFields = {};

  try {
    locationData = JSON.parse(ad.location || "{}");
  } catch {
    locationData = {};
  }

  try {
    extraFields = ad.fields ? JSON.parse(JSON.parse(ad.fields)) : {};
  } catch {
    extraFields = {};
  }

  const handleMapClick = () => {
    const { lat, lng } = locationData;
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  const handleCall = () => {
    if (ad.contact_phone) window.location.href = `tel:${ad.contact_phone}`;
  };

  const handleMessage = () => {
    if (ad.contact_email) window.location.href = `mailto:${ad.contact_email}`;
  };

  return (
    <div className="ad-details-container">
      {/* LEFT: Image Section */}
      <div className="ad-left">
        <div className="image-carousel">
          {ad.images && ad.images.length > 0 ? (
            <>
              <img
                src={baseUrlImg + ad.images[currentImage]}
                alt={ad.title}
                className="main-image"
              />
              <button
                className="nav-btn left"
                onClick={() =>
                  setCurrentImage(
                    (prev) => (prev - 1 + ad.images.length) % ad.images.length
                  )
                }
              >
                ‹
              </button>
              <button
                className="nav-btn right"
                onClick={() =>
                  setCurrentImage((prev) => (prev + 1) % ad.images.length)
                }
              >
                ›
              </button>
            </>
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>

        {/* Thumbnails */}
        {ad.images && ad.images.length > 1 && (
          <div className="thumb-container">
            {ad.images.map((img, i) => (
              <img
                key={i}
                src={baseUrlImg + img}
                alt="thumb"
                className={`thumb ${i === currentImage ? "active" : ""}`}
                onClick={() => setCurrentImage(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Details Section */}
      <div className="ad-right">
        <h2 className="ad-title">{ad.title}</h2>
        <p className="ad-category">🏠 {ad.category_name}</p>
        <p className="ad-posted-by">👤 Posted by {ad.user_name}</p>

        <div className="ad-price">₹{ad.price} / month</div>

        <p className="ad-description">{ad.description}</p>

        {/* Property Details */}
        {Object.keys(extraFields).length > 0 && (
          <div className="property-details">
            <h4>🏡 Property Details</h4>
            <ul>
              {extraFields.property_type && (
                <li>
                  <b>Type:</b> {extraFields.property_type}
                </li>
              )}
              {extraFields.room_type && (
                <li>
                  <b>Room Type:</b> {extraFields.room_type}
                </li>
              )}
              {extraFields.furnishing && (
                <li>
                  <b>Furnishing:</b> {extraFields.furnishing}
                </li>
              )}
              {extraFields.available_from && (
                <li>
                  <b>Available From:</b> {extraFields.available_from}
                </li>
              )}
              {extraFields.preferred_gender && (
                <li>
                  <b>Preferred Gender:</b> {extraFields.preferred_gender}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Location */}
        {locationData.address && (
          <div className="ad-location">
            📍 <b>Address:</b> {locationData.address}
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          {ad.contact_phone && (
            <button className="btn call" onClick={handleCall}>
              📞 Call
            </button>
          )}
          {ad.contact_email && (
            <button className="btn message" onClick={handleMessage}>
              💬 Message
            </button>
          )}
          {locationData.lat && (
            <button className="btn map" onClick={handleMapClick}>
              🗺 View Map
            </button>
          )}
          <button className="btn book">🛏 Book / Use This Room</button>
        </div>

        {/* Contact Info */}
        <div className="contact-box">
          <h4>Contact Info</h4>
          <p>Email: {ad.contact_email}</p>
          <p>Phone: {ad.contact_phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsPage;
