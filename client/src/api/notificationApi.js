import axiosInstance from "./axiosInstance";

export const getNotifications = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/notifications/${userId}`
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
};


export const markNotificationAsRead = async (notificationId) => {
  try {
    await axiosInstance.put(`/notifications/read/${notificationId}`);
    } catch (error) {
    console.error("Error marking notification as read:", error.message);
    throw error;
  }
};
     
export const clearAllNotifications = async (userId) => {
  try {
    await axiosInstance.delete(`/notifications/clear/${userId}`);
  } catch (error) {
    console.error("Error clearing notifications:", error.message);
    throw error;
  }
};

