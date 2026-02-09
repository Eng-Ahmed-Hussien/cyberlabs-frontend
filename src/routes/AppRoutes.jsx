/* ========================================
   App Routes - WITH AUTH ROUTES
   ======================================== */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import AuthPage from '@/pages/Auth/AuthPage';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import Dashboard from '@/pages/Dashboard/Dashboard';

// Placeholder components (replace with actual pages)
const HomePage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Home Page</h1>
    <p>Welcome to CyberLabs</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<HomePage />} />

      {/* Auth Routes - Only accessible when NOT logged in */}
      <Route
        path='/auth'
        element={
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        }
      />

      <Route
        path='/auth/forgot-password'
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />

      {/* Email Verification - Requires authentication */}
      <Route
        path='/auth/verify-email'
        element={
          <ProtectedRoute requireVerified={false}>
            <VerifyEmail />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Require authentication */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 - Redirect to home */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AppRoutes;
