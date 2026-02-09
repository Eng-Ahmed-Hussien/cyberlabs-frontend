/* ========================================
   Application Constants
   ======================================== */

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://cyberlabs-backend-v1.vercel.app/api/v1';
export const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CyberLabs';
export const GA_ID = import.meta.env.VITE_GA_ID || '';

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'CuberWeb',
  REFRESH_TOKEN: 'cyberlabs_refresh_token',
  USER: 'cyberlabs_user',
  THEME: 'cyberlabs_theme',
  LANGUAGE: 'cyberlabs_language',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT',
};

// App Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth',
  REGISTER: '/auth',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  LOGOUT: '/logout',
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  OTP_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
};

// Theme Options
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// Language Options
export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
  VERIFY_EMAIL_OTP: '/auth/verify-email-otp',
  RESEND_VERIFICATION: '/auth/resend-verification',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',

  // OAuth
  GOOGLE_LOGIN: '/auth/google',
  GITHUB_LOGIN: '/auth/github',
};

// SweetAlert2 Default Config
export const SWAL_CONFIG = {
  confirmButtonColor: 'var(--main-color)',
  cancelButtonColor: '#d33',
  background: 'var(--card-bg)',
  color: 'var(--primary-text)',
};
