/* ========================================
   API Services - Exports
   ======================================== */

import authService from './auth.service';

// Export all services
export { authService };

// Default export for convenience
export default {
  auth: authService,
};
