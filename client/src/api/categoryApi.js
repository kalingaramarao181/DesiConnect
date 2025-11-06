import axiosInstance from "./axiosInstance";

// ✅ Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

// ✅ Add a new category
export const addCategory = async (categoryData) => {
  try {
    const formData = new FormData();

    Object.keys(categoryData).forEach((key) => {
      if (categoryData[key] !== null && categoryData[key] !== undefined) {
        formData.append(key, categoryData[key]);
      }
    });

    const response = await axiosInstance.post("/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding category:", error.message);
    throw error;
  }
};

// ✅ Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    const formData = new FormData();

    Object.keys(categoryData).forEach((key) => {
      if (categoryData[key] !== null && categoryData[key] !== undefined) {
        formData.append(key, categoryData[key]);
      }
    });

    const response = await axiosInstance.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

// ✅ Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};
