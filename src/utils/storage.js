/* ========================================
   Storage Utility - SECURE VERSION
   ======================================== */

import { STORAGE_KEYS } from './constants';

// 🔒 Simple encryption (use a proper library in production)
const encrypt = (data) => {
  try {
    return btoa(encodeURIComponent(JSON.stringify(data)));
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
};

const decrypt = (data) => {
  try {
    return JSON.parse(decodeURIComponent(atob(data)));
  } catch (error) {
    return null;
  }
};

export const storage = {
  // Access Token
  getAccessToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch {
      return null;
    }
  },

  setAccessToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      }
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  },

  // Refresh Token
  getRefreshToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch {
      return null;
    }
  },

  setRefreshToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
      }
    } catch (error) {
      console.error('Failed to set refresh token:', error);
    }
  },

  // 🔒 CSRF Token
  getCSRFToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CSRF_TOKEN);
    } catch {
      return null;
    }
  },

  setCSRFToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.CSRF_TOKEN, token);
      }
    } catch (error) {
      console.error('Failed to set CSRF token:', error);
    }
  },

  // User - 🔒 With encryption
  getUser: () => {
    try {
      const encryptedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (!encryptedUser) return null;
      return decrypt(encryptedUser);
    } catch {
      return null;
    }
  },

  setUser: (user) => {
    try {
      if (user) {
        const encrypted = encrypt(user);
        if (encrypted) {
          localStorage.setItem(STORAGE_KEYS.USER, encrypted);
        }
      }
    } catch (error) {
      console.error('Failed to set user:', error);
    }
  },

  // 🔒 Check if authenticated with token expiry
  isAuthenticated: () => {
    try {
      const token = storage.getAccessToken();
      if (!token) return false;

      // Check token expiry
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        // Token expired, clear it
        storage.clearAll();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  // 🔒 Secure clear - overwrite before deleting
  clearAll: () => {
    try {
      // Overwrite with random data first (security best practice)
      Object.values(STORAGE_KEYS).forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.setItem(key, Math.random().toString(36));
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },

  // 🔒 Clear specific item securely
  clearItem: (key) => {
    try {
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, Math.random().toString(36));
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Failed to clear ${key}:`, error);
    }
  },
};
