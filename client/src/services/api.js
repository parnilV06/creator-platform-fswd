import axios from "axios";

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

/*
---------------------------------------------------------
REQUEST INTERCEPTOR
Automatically attach JWT token to every request
---------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, attach it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return modified request config
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

/*
---------------------------------------------------------
RESPONSE INTERCEPTOR
Handle global API errors like 401 Unauthorized
---------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Avoid redirect loops when already on the login page.
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Pass error to the component that made the request
    return Promise.reject(error);
  }
);

export default api;