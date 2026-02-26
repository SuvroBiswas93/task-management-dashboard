import axios from "axios";

const API_BASE = "https://task-api-eight-flax.vercel.app/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Automatically attach token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Central error handler (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong, try again.";
    return Promise.reject(new Error(message));
  }
);

// API Routes
export const api = {
  login: async (email, password) => {
    const res = await apiClient.post("/login", { email, password });
    return res.data;
  },

  getOverview: async () => {
    const res = await apiClient.get("/overview");
    return res.data;
  },

  getUsers: async () => {
    const res = await apiClient.get("/users");
    return res.data;
  },

  getAnalytics: async () => {
    const res = await apiClient.get("/analytics");
    return res.data;
  },

  getProducts: async () => {
    const res = await apiClient.get("/products");
    return res.data;
  },

  getDashboard: async () => {
    const res = await apiClient.get("/dashboard");
    return res.data;
  },
};