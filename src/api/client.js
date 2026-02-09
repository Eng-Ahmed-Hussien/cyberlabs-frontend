/* ========================================
   Axios Client Configuration - SECURE VERSION
   ======================================== */

import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';
import { storage } from '@/utils/storage';
import Swal from 'sweetalert2';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ للـ cookies
});

// ✅ Security: Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();

    // ✅ Check token expiry before sending
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Add CSRF token if available
    const csrfToken = storage.getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ✅ Track failed refresh attempts to prevent infinite loops
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ✅ Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = storage.getRefreshToken();

        if (!refreshToken || isTokenExpired(refreshToken)) {
          throw new Error('Refresh token expired');
        }

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true },
        );

        const { accessToken } = response.data;
        storage.setAccessToken(accessToken);

        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // ✅ Secure logout
        storage.clearAll();

        // ✅ Don't log sensitive info in production
        if (process.env.NODE_ENV !== 'production') {
          console.error('Token refresh failed:', refreshError);
        }

        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to perform this action',
        confirmButtonColor: 'var(--main-color)',
        background: 'var(--card-bg)',
        color: 'var(--primary-text)',
      });
    }

    if (error.response?.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: 'var(--main-color)',
        background: 'var(--card-bg)',
        color: 'var(--primary-text)',
      });
    }

    // ✅ Don't expose error details in production
    if (process.env.NODE_ENV !== 'production') {
      console.error('API Error:', error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
