import React, { useEffect, useState } from "react";
import "../styles/AddForm.css";
import { getFieldsByCategory } from "../../api/categoryFieldApi";
import { getAllCategories } from "../../api/categoryApi";
import { createAd } from "../../api/AdApi";
import DynamicFieldSection from "./DynamicFieldSection";
import ImageUploader from "./ImageUploader";
import MapModal from "./MapModal";
import { FaLocationDot } from "react-icons/fa6";
import { getUserDataFromCookies } from "../../utils/cookiesData";

const AddForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryFields, setCategoryFields] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState({});
  const [images, setImages] = useState([]);
  const [loadingFields, setLoadingFields] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const userData = getUserDataFromCookies();

  // 🔹 Load all categories
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCategories();
        setCategories(data?.data || []);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    })();
  }, []);

  // 🔹 Load category-specific fields
  useEffect(() => {
    const fetchCategoryFields = async () => {
      if (!selectedCategory) return;
      setLoadingFields(true);
      try {
        const data = await getFieldsByCategory(selectedCategory);
        setCategoryFields(data?.data || []);
      } catch (err) {
        console.error("Error loading fields:", err);
      } finally {
        setLoadingFields(false);
      }
    };
    fetchCategoryFields();
  }, [selectedCategory]);

  // 🔹 Common field handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Dynamic field handler
  const handleChangeField = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    console.log(`🟢 Field Changed: ${name} → ${finalValue}`);

    setFields((prev) => {
      const updated = { ...prev, [name]: finalValue };
      console.log("🧩 Updated Fields Object:", updated);
      return updated;
    });
  };

  const handleMapSelect = (fieldName, locationObj) => {
    console.log("Location Obj1",locationObj);
    
    setFields((prev) => ({
      ...prev,
       [fieldName]: {
      ...prev[fieldName],
      ...locationObj,
    },
    }));
  };

  // 🔹 Category select
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFields({});
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      fields: JSON.stringify(fields),
      user_id: userData?.id || null,
      category_id: selectedCategory,
      latitude: markerPosition?.[0] || null,
      longitude: markerPosition?.[1] || null,
      location: address || "",
    };

    console.log("🚀 Final Data Sent:", finalData);

    try {
      const response = await createAd(finalData, images);
      alert("✅ Ad created successfully!");
      console.log("Response:", response);
    } catch (err) {
      console.error("❌ Error submitting ad:", err);
      alert("Failed to create ad.");
    }
  };

  return (
    <div className="cf-form-wrapper">
      <h2 className="cf-form-title">Post Ad</h2>

      <form onSubmit={handleSubmit}>
        {/* CATEGORY */}
        <div className="cf-input-group">
          <select
            name="category_id"
            className="cf-select"
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <span className="cf-underline"></span>
        </div>

        {/* DYNAMIC FIELDS */}
        <DynamicFieldSection
          loading={loadingFields}
          fields={categoryFields}
          handleChangeField={handleChangeField}
          values={fields}
          handleMapSelect={handleMapSelect}
          setLoadingLocation={setLoadingLocation}
        />

        {/* STATIC FIELDS */}
        <div className="cf-input-group">
          <input
            type="text"
            name="title"
            className="cf-input"
            placeholder=" "
            onChange={handleChange}
          />
          <label className="cf-label">Title</label>
          <span className="cf-underline"></span>
        </div>

        <div className="cf-input-group">
          <input
            type="number"
            name="price"
            className="cf-input"
            placeholder=" "
            onChange={handleChange}
          />
          <label className="cf-label">Price</label>
          <span className="cf-underline"></span>
        </div>

        <div className="cf-location-section">
          <button
            type="button"
            className="cf-location-btn"
            onClick={() => setMapVisible(true)}
          >
            <FaLocationDot /> Select Location
            {loadingLocation && (
              <div className="cf-loader"></div> // 👈 Loader here
            )}
          </button>
          {address && <p className="cf-location-text"> {address}</p>}
        </div>

        {mapVisible && (
          <MapModal
            setMapVisible={setMapVisible}
            setAddress={setAddress}
            setMarkerPosition={setMarkerPosition}
            setLoadingLocation={setLoadingLocation}
          />
        )}

        <div className="cf-input-group">
          <textarea
            name="description"
            className="cf-textarea"
            placeholder=" "
            onChange={handleChange}
          ></textarea>
          <label className="cf-label">Description</label>
          <span className="cf-underline"></span>
        </div>

        <ImageUploader images={images} setImages={setImages} />

        <div className="cf-input-group">
          <input
            type="text"
            name="contact_email"
            className="cf-input"
            placeholder=" "
            onChange={handleChange}
          />
          <label className="cf-label">Contact Email</label>
          <span className="cf-underline"></span>
        </div>

        <div className="cf-input-group">
          <input
            type="text"
            name="contact_phone"
            className="cf-input"
            placeholder=" "
            onChange={handleChange}
          />
          <label className="cf-label">Contact Phone</label>
          <span className="cf-underline"></span>
        </div>

        <div className="cf-input-group">
          <select
            name="status"
            className="cf-select"
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
          <span className="cf-underline"></span>
        </div>

        <button type="submit" className="cf-submit-btn">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AddForm;
