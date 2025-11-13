import axiosInstance from "./axiosInstance"; // make sure you already have baseURL set

// ✅ Create new Ad (with images and data)
export const createAd = async (adData, images) => {
  try {
    const formData = new FormData();


    // Append all basic fields
    for (const key in adData) {
      if (adData[key] !== undefined && adData[key] !== null) {
        formData.append(key, adData[key]);
      }
    }

    // Add folder name if you want to save images in specific folder
    formData.append("folder", "ads");

    // Add images (multiple files)
    if (images?.length > 0) {
      images.forEach((img) => {
        formData.append("images", img.file);
      });
    }

    // Send request
    const res = await axiosInstance.post("/adds", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating ad:", error);
    throw error;
  }
};

// ✅ Update Ad
export const updateAd = async (id, formData) => {
  try {
    const res = await axiosInstance.put(`/ads/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating ad:", error);
    throw error;
  }
};

// ✅ Delete Ad
export const deleteAd = async (id) => {
  try {
    const res = await axiosInstance.delete(`/adds/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw error;
  }
};

// ✅ Get All Ads (supports filters via query params)
export const getAllAds = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await axiosInstance.get(`/adds/all/filters?${query}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all ads:", error);
    throw error;
  }
};

// ✅ Get Ads by Category
export const getAdsByCategory = async (category_id, filters = {}) => {
    console.log(category_id);
    
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await axiosInstance.get(`/adds/category/${category_id}?${query}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ads by category:", error);
    throw error;
  }
};

export const getAdDetailsById = async (adId) => {
  try {
    const res = await axiosInstance.get(`/adds/adDetails/${adId}`);
    return res.data;
  }
  catch (error) {
    console.error("Error fetching ad details:", error);
    throw error;
  }
};

// ✅ Get Ads by User
export const getAdsByUser = async (user_id, filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await axiosInstance.get(`/adds/users/${user_id}?${query}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ads by user:", error);
    throw error;
  }
};
