import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { store } from "../store/index";
import { resetAuth, setCredentials } from "../store/slices/authSlice";

// ── Create instance ───────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:5000/api
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ───────────────────────
// Automatically attaches JWT token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ── Track if refresh is already in progress ───
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

// ── Response interceptor ──────────────────────
// Handles token expiry globally — no need to check in every API call
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = store.getState().auth.refreshToken;

    if (!refreshToken) {
      store.dispatch(resetAuth());
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refreshToken },
      );

      store.dispatch(
        setCredentials({
          user: data.user,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      // Retry all queued requests with new token
      processQueue(null, data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed — log user out
      processQueue(refreshError, null);
      store.dispatch(resetAuth());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }    
  },
);

export default api;
