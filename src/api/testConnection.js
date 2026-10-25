import api from "./axios";

export const testConnection = async () => {
  try {
    const response = await api.get("/");
    console.log("Backend connected:", response.data);
  } catch (error) {
    console.error(
      "Backend error:",
      error.response?.data || error.message
    );
  }
};