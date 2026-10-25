import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-transaction-system-mome.onrender.com",
  withCredentials: true,
});

export default api;