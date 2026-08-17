import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Shared Axios instance.
 * `withCredentials: true` is required so the HTTP-only auth cookie
 * set by the backend is sent on admin requests.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize errors so calling code can rely on { status, message }.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    return Promise.reject({ status, message });
  }
);

export default apiClient;
