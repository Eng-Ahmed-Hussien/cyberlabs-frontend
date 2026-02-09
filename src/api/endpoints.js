/* ========================================
   API Endpoints
   ======================================== */

export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    verifyEmailOTP: '/auth/verify-email-otp',
    resendVerification: '/auth/resend-verification',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
  },

  // OAuth
  oauth: {
    google: '/auth/google',
    github: '/auth/github',
  },

  // User
  user: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    uploadAvatar: '/users/avatar',
  },

  // Labs
  labs: {
    list: '/labs',
    get: (id) => `/labs/${id}`,
    submit: (id) => `/labs/${id}/submit`,
    hints: (id) => `/labs/${id}/hints`,
  },

  // Courses
  courses: {
    list: '/courses',
    get: (id) => `/courses/${id}`,
    enroll: (id) => `/courses/${id}/enroll`,
    progress: (id) => `/courses/${id}/progress`,
  },
};
