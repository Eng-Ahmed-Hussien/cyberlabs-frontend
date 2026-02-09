/* ========================================
   Form Validation Helpers
   ======================================== */

import { VALIDATION } from './constants';

// Email validation
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  return null;
};

// Name validation
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  return null;
};

// OTP validation
export const validateOTP = (otp) => {
  if (!otp || otp.trim() === '') {
    return 'OTP is required';
  }
  if (otp.length !== VALIDATION.OTP_LENGTH) {
    return `OTP must be ${VALIDATION.OTP_LENGTH} digits`;
  }
  if (!/^\d+$/.test(otp)) {
    return 'OTP must contain only numbers';
  }
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

// Generic form validation
export const validateForm = (fields) => {
  const errors = {};

  Object.keys(fields).forEach((key) => {
    const value = fields[key];

    switch (key) {
      case 'email':
        errors[key] = validateEmail(value);
        break;
      case 'password':
        errors[key] = validatePassword(value);
        break;
      case 'name':
      case 'username':
        errors[key] = validateName(value);
        break;
      case 'confirmPassword':
        errors[key] = validateConfirmPassword(fields.password, value);
        break;
      case 'otp':
        errors[key] = validateOTP(value);
        break;
      default:
        break;
    }
  });

  // Remove null errors
  Object.keys(errors).forEach((key) => {
    if (errors[key] === null) {
      delete errors[key];
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
