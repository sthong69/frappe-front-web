import axios from "axios";

// Public API instance
export const publicAPI = axios.create({
  baseURL: import.meta.env.BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Secure API instance
const secureAPI = axios.create({
  baseURL: import.meta.env.BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for secureAPI to add the Authorization header for each request on secure API endpoints
secureAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export secureAPI as the default export
export default secureAPI;
