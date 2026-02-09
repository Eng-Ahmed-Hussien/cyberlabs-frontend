/* ========================================
   Guest Route - For non-authenticated users only
   ======================================== */

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className='loading-screen'>
        <div className='loading-spinner'>
          <div className='spinner'></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  // Not authenticated - show the page
  return children;
};

export default GuestRoute;
