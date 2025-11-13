import axiosInstance from "./axiosInstance";

export const getMessages = async (senderId, receiverId, adId) => {
  try {
    const response = await axiosInstance.get(
      `/messages?senderId=${senderId}&receiverId=${receiverId}&adId=${adId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
};

export const sendMessageApi = async (messageData) => {
  try {
    const response = await axiosInstance.post("/messages", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error;
  }
};

export const getChatUsers = async (adId, ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/messages/chat-users?adId=${adId}&ownerId=${ownerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat users:", error.message);
    throw error;
  }
};

export const markMessagesAsRead = async (senderId, receiverId, adId) => {
  try {
    const response = await axiosInstance.put("/messages/mark-read", {
      senderId,
      receiverId,
      adId,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error.message);
    throw error;
  }
};
