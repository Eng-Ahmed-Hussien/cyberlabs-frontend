/* ========================================
   Auth Context - Authentication State
   ======================================== */

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { authService } from '@/api/services';
import Swal from 'sweetalert2';
import { ROUTES, SWAL_CONFIG } from '@/utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.getUser());
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    storage.isAuthenticated(),
  );
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (storage.isAuthenticated()) {
          const userData = await authService.me();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        storage.clearAll();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);

      const { user, accessToken, refreshToken } = response;

      storage.setAccessToken(accessToken);
      storage.setRefreshToken(refreshToken);
      storage.setUser(user);

      setUser(user);
      setIsAuthenticated(true);

      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: `Hi ${user.name}!`,
        timer: 2000,
        ...SWAL_CONFIG,
      });

      navigate(ROUTES.DASHBOARD);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message,
        ...SWAL_CONFIG,
      });

      return { success: false, error: message };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      const { user, accessToken, refreshToken } = response;

      storage.setAccessToken(accessToken);
      storage.setRefreshToken(refreshToken);
      storage.setUser(user);

      setUser(user);
      setIsAuthenticated(true);

      Swal.fire({
        icon: 'info',
        title: 'Account Created!',
        text: 'Please verify your email address',
        ...SWAL_CONFIG,
      });

      navigate(ROUTES.VERIFY_EMAIL);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: message,
        ...SWAL_CONFIG,
      });

      return { success: false, error: message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      storage.clearAll();
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.AUTH);

      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'See you soon!',
        timer: 2000,
        ...SWAL_CONFIG,
      });
    }
  };

  // Update user
  const updateUser = (userData) => {
    setUser(userData);
    storage.setUser(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
