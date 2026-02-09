/* ========================================
   Constants - Application Configuration
   ======================================== */

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://cyberlabs-backend-v1.vercel.app/api/v1';

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth',
  REGISTER: '/auth',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// SweetAlert2 Default Config
export const SWAL_CONFIG = {
  confirmButtonColor: 'var(--main-color)',
  background: 'var(--card-bg)',
  color: 'var(--primary-text)',
  showConfirmButton: true,
  timer: undefined,
  customClass: {
    popup: 'swal-custom-popup',
    title: 'swal-custom-title',
    content: 'swal-custom-content',
    confirmButton: 'swal-custom-confirm',
    cancelButton: 'swal-custom-cancel',
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'lang',
  CSRF_TOKEN: 'csrfToken',
  REMEMBER_ME: 'rememberMe',
};

// Security Settings
export const SECURITY = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
  PASSWORD_MIN_LENGTH: 8,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_WEAK:
    'Password must contain uppercase, lowercase, number and special character',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  TERMS_REQUIRED: 'You must accept the terms and conditions',
};

// API Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_CODE: '/auth/resend-verification',
    ME: '/auth/me',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE: '/user/delete',
  },
};
