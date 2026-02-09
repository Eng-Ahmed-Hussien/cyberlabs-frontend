/* ========================================
   App Routes Configuration
   ======================================== */

import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

// Lazy load pages
import { lazy, Suspense } from 'react';
import Preloader from '@/components/Preloader/Preloader';

const LoginRegister = lazy(
  () => import('@/pages/Auth/LoginRegister/LoginRegister'),
);
const VerifyEmail = lazy(() => import('@/pages/Auth/VerifyEmail/VerifyEmail'));
const ForgotPassword = lazy(
  () => import('@/pages/Auth/ForgotPassword/ForgotPassword'),
);
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {/* Guest Routes */}
        <Route
          path={ROUTES.AUTH}
          element={
            <GuestRoute>
              <LoginRegister />
            </GuestRoute>
          }
        />

        {/* Public Routes */}
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
