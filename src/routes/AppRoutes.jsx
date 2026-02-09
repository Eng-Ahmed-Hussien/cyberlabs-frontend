import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/pages/Auth/AuthPage';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

// Import your other pages here
// import Dashboard from '@/pages/Dashboard';
// import Home from '@/pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<div>Home Page</div>} />

      {/* Auth Routes - Only for guests */}
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
