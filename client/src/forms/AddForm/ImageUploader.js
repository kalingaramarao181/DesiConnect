// src/pages/AddForm/ImageUploader.js
import React from "react";

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const removeImage = (index, e) => {
    e.preventDefault();
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="cf-upload-container">
      <h2 className="cf-upload-title">Upload Your Images</h2>
      <div
        className="cf-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="cf-drop-text">
          Drag & drop images here or <span>click to browse</span>
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          className="cf-file-input"
          onChange={handleImageChange}
        />
      </div>

      {images.length > 0 && (
        <div className="cf-image-preview">
          {images.map((img, i) => (
            <div key={i} className="cf-preview-box">
              <img src={img.preview} alt="" className="cf-preview-img" />
              <button
                className="cf-remove-btn"
                onClick={(e) => removeImage(i, e)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
