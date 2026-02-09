import * as yup from 'yup';

// Password validation rules
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

// Login Schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean(),
});

// Register Schema
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRules,
      'Password must contain uppercase, lowercase, number and special character',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});

// Forgot Password Schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

// Reset Password Schema
export const resetPasswordSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be 6 digits')
    .required('Verification code is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRules, 'Password must meet requirements')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Verify Email Schema
export const verifyEmailSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be 6 digits')
    .required('Verification code is required'),
});
