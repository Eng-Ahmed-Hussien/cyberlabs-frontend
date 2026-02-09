import apiClient from '../client';
import { endpoints } from '../endpoints';
import { success, error as errorAlert, loading, close } from '@/utils/alertKit';

export const authService = {
  // Login
  login: async (credentials) => {
    loading('Logging in...');

    try {
      const response = await apiClient.post(endpoints.auth.login, credentials);
      close();

      success({
        title: 'Welcome Back!',
        text: `Hi ${response.data.user.name}!`,
        timer: 1500,
      });

      return response.data;
    } catch (err) {
      close();

      const message = err.response?.data?.message || 'Login failed';
      errorAlert({
        title: 'Login Failed',
        text: message,
      });

      throw err;
    }
  },

  // Register
  register: async (userData) => {
    loading('Creating your account...');

    try {
      const response = await apiClient.post(endpoints.auth.register, userData);
      close();

      success({
        title: 'Account Created!',
        text: 'Please check your email for verification code',
        timer: 2000,
      });

      return response.data;
    } catch (err) {
      close();

      const message = err.response?.data?.message || 'Registration failed';
      errorAlert({
        title: 'Registration Failed',
        text: message,
      });

      throw err;
    }
  },

  // Verify Email with OTP
  verifyEmailOTP: async (email, otp) => {
    loading('Verifying...');

    try {
      const response = await apiClient.post(endpoints.auth.verifyEmailOTP, {
        email,
        otp,
      });
      close();

      success({
        title: 'Email Verified!',
        text: 'Your account is now active',
        timer: 1500,
      });

      return response.data;
    } catch (err) {
      close();

      const message = err.response?.data?.message || 'Invalid OTP';
      errorAlert({
        title: 'Verification Failed',
        text: message,
      });

      throw err;
    }
  },

  // Resend Verification
  resendVerification: async (email) => {
    loading('Sending OTP...');

    try {
      const response = await apiClient.post(endpoints.auth.resendVerification, {
        email,
      });
      close();

      success({
        title: 'OTP Sent!',
        text: 'Check your email for the new code',
        timer: 2000,
      });

      return response.data;
    } catch (err) {
      close();

      const message = err.response?.data?.message || 'Failed to send OTP';
      errorAlert({
        title: 'Failed',
        text: message,
      });

      throw err;
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    loading('Sending reset link...');

    try {
      const response = await apiClient.post(endpoints.auth.forgotPassword, {
        email,
      });
      close();

      success({
        title: 'Email Sent!',
        text: 'Check your email for password reset instructions',
        timer: 2000,
      });

      return response.data;
    } catch (err) {
      close();

      const message =
        err.response?.data?.message || 'Failed to send reset link';
      errorAlert({
        title: 'Failed',
        text: message,
      });

      throw err;
    }
  },

  // Reset Password
  resetPassword: async (token, newPassword) => {
    loading('Resetting password...');

    try {
      const response = await apiClient.post(endpoints.auth.resetPassword, {
        token,
        newPassword,
      });
      close();

      success({
        title: 'Password Reset!',
        text: 'You can now login with your new password',
        timer: 2000,
      });

      return response.data;
    } catch (err) {
      close();

      const message = err.response?.data?.message || 'Failed to reset password';
      errorAlert({
        title: 'Failed',
        text: message,
      });

      throw err;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await apiClient.post(endpoints.auth.logout);
      return response.data;
    } catch (error) {
      // Silent failure for logout
      console.error('Logout error:', error);
    }
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post(endpoints.auth.refresh, {
      refreshToken,
    });
    return response.data;
  },

  // Get current user
  me: async () => {
    const response = await apiClient.get(endpoints.auth.me);
    return response.data;
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    loading('Changing password...');

    try {
      const response = await apiClient.post(endpoints.auth.changePassword, {
        oldPassword,
        newPassword,
      });
      close();

      success({
        title: 'Password Changed!',
        text: 'Your password has been updated successfully',
        timer: 2000,
      });

      return response.data;
    } catch (err) {
      close();

      const message =
        err.response?.data?.message || 'Failed to change password';
      errorAlert({
        title: 'Failed',
        text: message,
      });

      throw err;
    }
  },
};
