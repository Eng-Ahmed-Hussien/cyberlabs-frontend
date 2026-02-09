/* ========================================
   Alert Kit - SweetAlert2 Wrapper
   Based on: uialert-kit pattern
   ======================================== */

import Swal from 'sweetalert2';

// Alert Types (Flags)
const FLAGS = {
  OK: 'success',
  ERR: 'error',
  WARN: 'warning',
  INFO: 'info',
  QUESTION: 'question',
};

// Default Config
const DEFAULT_CONFIG = {
  confirmButtonColor: 'var(--main-color)',
  cancelButtonColor: '#6c757d',
  background: 'var(--secondary-bg)',
  color: 'var(--primary-text)',
  iconColor: 'var(--main-color)',
};

/**
 * Core alertify function - Low-level API
 * @param {string} type - Alert type (OK, ERR, WARN, INFO, QUESTION)
 * @param {object} options - SweetAlert2 options
 */
export const alertify = (type, options = {}) => {
  const config = {
    ...DEFAULT_CONFIG,
    icon: FLAGS[type] || type,
    ...options,
  };

  return Swal.fire(config);
};

/**
 * Success Alert - Used for positive feedback
 * @param {object} options
 */
export const success = (options = {}) => {
  return alertify(FLAGS.OK, {
    title: 'Success!',
    timer: 2000,
    showConfirmButton: false,
    ...options,
  });
};

/**
 * Error Alert - Used for failures
 * @param {object} options
 */
export const error = (options = {}) => {
  return alertify(FLAGS.ERR, {
    title: 'Error!',
    showConfirmButton: true,
    ...options,
  });
};

/**
 * Warning Alert - Used for important notices
 * @param {object} options
 */
export const warning = (options = {}) => {
  return alertify(FLAGS.WARN, {
    title: 'Warning!',
    showConfirmButton: true,
    ...options,
  });
};

/**
 * Info Alert - Used for informational messages
 * @param {object} options
 */
export const info = (options = {}) => {
  return alertify(FLAGS.INFO, {
    title: 'Info',
    showConfirmButton: true,
    ...options,
  });
};

/**
 * Confirm Dialog - Used for confirmation actions
 * @param {object} options
 * @returns {Promise} - Resolves with {isConfirmed: boolean}
 */
export const confirm = (options = {}) => {
  return alertify(FLAGS.QUESTION, {
    title: 'Are you sure?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    ...options,
  });
};

/**
 * Toast Notification - Small non-intrusive alert
 * @param {string} type - success, error, warning, info
 * @param {string} message
 */
export const toast = (type, message) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: 'var(--secondary-bg)',
    color: 'var(--primary-text)',
  });
};

/**
 * Loading Alert - Shows loading state
 * @param {string} title
 */
export const loading = (title = 'Loading...') => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    background: 'var(--secondary-bg)',
    color: 'var(--primary-text)',
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

/**
 * Close current alert
 */
export const close = () => {
  Swal.close();
};

// Default export
export default {
  alertify,
  success,
  error,
  warning,
  info,
  confirm,
  toast,
  loading,
  close,
  FLAGS,
};
