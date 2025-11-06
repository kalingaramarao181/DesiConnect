import axiosInstance from "./axiosInstance";

// ✅ Get all fields for a specific category
export const getFieldsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}/fields`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category fields:", error.message);
    throw error;
  }
};

// ✅ Add new fields to a category
export const addField = async (categoryId, fieldData) => {
  try {
    const response = await axiosInstance.post(
      `/categories/${categoryId}/fields`,
      fieldData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category field:", error.message);
    throw error;
  }
};

// ✅ Update a specific field
export const updateField = async (fieldId, fieldData) => {
  try {
    const response = await axiosInstance.put(
      `/categories/fields/${fieldId}`,
      fieldData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating field:", error.message);
    throw error;
  }
};

// ✅ Delete a specific field
export const deleteField = async (fieldId) => {
  try {
    const response = await axiosInstance.delete(`/categories/fields/${fieldId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting field:", error.message);
    throw error;
  }
};
