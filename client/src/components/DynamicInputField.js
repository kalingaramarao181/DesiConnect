import React from "react";
import "../forms/styles/AddForm.css";

const DynamicInputField = ({ field, handleChangeField, value }) => {
  const fieldName = field.field_name || field.name; // Ensure correct key
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

  return (
    <div className="cf-input-group">
      {/* TEXT / NUMBER / DATE */}
      {["text", "number", "date"].includes(field.input_type) && (
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

      {/* SELECT */}
      {field.input_type === "select" && (
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

      {/* TEXTAREA */}
      {field.input_type === "textarea" && (
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
