import React from "react";
import DynamicInputField from "../../components/DynamicInputField";

const DynamicFieldSection = ({ loading, fields, handleChangeField, values, handleMapSelect, setLoadingLocation  }) => {
  if (loading) return <p>Loading fields...</p>;
  if (!fields?.length) return <p>No dynamic fields available.</p>;

  return (
    <div className="cf-category-section">
      {fields.map((field) => {
        const fieldKey = field.field_name || field.name; // handle both cases
        return (
          <DynamicInputField
            key={field.id}
            field={field}
            handleChangeField={handleChangeField}
            handleMapSelect={handleMapSelect}
            value={values[fieldKey] || ""}
            setLoadingLocation={setLoadingLocation}
          />
        );
      })}
    </div>
  );
};

export default DynamicFieldSection;
