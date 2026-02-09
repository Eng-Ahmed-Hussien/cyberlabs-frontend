/* ========================================
   Axios Client Configuration
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
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getRefreshToken();

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;

          storage.setAccessToken(accessToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed - logout user
        storage.clearAll();
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

    return Promise.reject(error);
  },
);

export default apiClient;
