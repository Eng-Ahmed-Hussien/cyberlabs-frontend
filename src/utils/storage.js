/* ========================================
   Local Storage & Cookies Management
   ======================================== */

import Cookie from 'js-cookie';
import { STORAGE_KEYS } from './constants';

// Cookie options
const cookieOptions = {
  secure: import.meta.env.PROD,
  sameSite: 'strict',
};

export const storage = {
  // ========== Token Management (Cookies) ==========

  getAccessToken: () => {
    return Cookie.get(STORAGE_KEYS.ACCESS_TOKEN) || null;
  },

  setAccessToken: (token) => {
    Cookie.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
      ...cookieOptions,
      expires: 1, // 1 day
    });
  },

  getRefreshToken: () => {
    return Cookie.get(STORAGE_KEYS.REFRESH_TOKEN) || null;
  },

  setRefreshToken: (token) => {
    Cookie.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
      ...cookieOptions,
      expires: 7, // 7 days
    });
  },

  removeTokens: () => {
    Cookie.remove(STORAGE_KEYS.ACCESS_TOKEN);
    Cookie.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // ========== User Data (LocalStorage) ==========

  getUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  setUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // ========== Theme Management ==========

  getTheme: () => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.body.setAttribute('data-theme', theme);
  },

  // ========== Language Management ==========

  getLanguage: () => {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
  },

  setLanguage: (lang) => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  },

  // ========== Utility Methods ==========

  clearAll: () => {
    storage.removeTokens();
    storage.removeUser();
  },

  isAuthenticated: () => {
    return !!storage.getAccessToken();
  },
};
