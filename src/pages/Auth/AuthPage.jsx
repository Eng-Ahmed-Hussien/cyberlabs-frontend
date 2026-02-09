import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const title = isLogin
    ? { en: 'Welcome Back!', ar: 'مرحباً بعودتك!' }
    : { en: 'Create Account', ar: 'إنشاء حساب' };

  const subtitle = isLogin
    ? {
        en: 'Sign in to continue your learning journey',
        ar: 'سجل دخولك لمتابعة رحلة التعلم',
      }
    : {
        en: 'Join CyberLabs and start learning today',
        ar: 'انضم إلى CyberLabs وابدأ التعلم اليوم',
      };

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <div className='auth-tabs'>
        <button
          className={`tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
          ar-data='تسجيل الدخول'
          en-data='Login'>
          Login
        </button>
        <button
          className={`tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
          ar-data='إنشاء حساب'
          en-data='Register'>
          Register
        </button>
      </div>

      <div className='auth-form-container'>
        {isLogin ? (
          <LoginForm
            onSwitchToRegister={() => setIsLogin(false)}
            onForgotPassword={handleForgotPassword}
          />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
