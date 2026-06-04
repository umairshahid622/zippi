import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { store }      from '../store/index'
import { resetAuth }  from '../store/slices/authSlice'

// ── Create instance ───────────────────────────
const api: AxiosInstance = axios.create({
  baseURL:         import.meta.env.VITE_API_URL,  // http://localhost:5000/api
  timeout:         10000,                          // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request interceptor ───────────────────────
// Automatically attaches JWT token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor ──────────────────────
// Handles token expiry globally — no need to check in every API call
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status

    // Token expired or invalid — log out automatically
    if (status === 401) {
      store.dispatch(resetAuth())
      window.location.href = '/auth'    // hard redirect to auth page
    }

    // Server error — you can show a global toast here later
    if (status === 500) {
      console.error('Server error:', error.response?.data)
    }

    return Promise.reject(error)
  }
)

export default api