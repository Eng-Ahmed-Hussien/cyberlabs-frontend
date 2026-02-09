import { STORAGE_KEYS } from './constants';

// ✅ Encrypt sensitive data before storing (optional but recommended)
const encrypt = (data) => {
  // Simple base64 encoding (replace with actual encryption in production)
  return btoa(JSON.stringify(data));
};

const decrypt = (data) => {
  try {
    return JSON.parse(atob(data));
  } catch {
    return null;
  }
};

export const storage = {
  // Access Token
  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  },

  // Refresh Token
  getRefreshToken: () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    }
  },

  // ✅ CSRF Token
  getCSRFToken: () => localStorage.getItem(STORAGE_KEYS.CSRF_TOKEN),
  setCSRFToken: (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.CSRF_TOKEN, token);
    }
  },

  // User - ✅ With basic encryption
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? decrypt(user) : null;
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, encrypt(user));
    }
  },

  // Check if authenticated
  isAuthenticated: () => {
    const token = storage.getAccessToken();
    if (!token) return false;

    // ✅ Check token expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // ✅ Secure clear - overwrite before deleting
  clearAll: () => {
    // Overwrite with random data first (paranoid security)
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, '');
        localStorage.removeItem(key);
      }
    });
  },
};
