/* ========================================
   Login Form Component - SECURE & COMPLETE
   ======================================== */

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/validation/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './AuthForms.css';

const LoginForm = ({ onSwitchToRegister, onForgotPassword }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔒 Security: Rate limiting
  const [loginAttempts, setLoginAttempts] = useState(() => {
    const stored = sessionStorage.getItem('loginAttempts');
    return stored ? parseInt(stored) : 0;
  });
  const [lockoutTime, setLockoutTime] = useState(() => {
    const stored = sessionStorage.getItem('lockoutTime');
    return stored ? parseInt(stored) : null;
  });
  const [remainingTime, setRemainingTime] = useState(0);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  // Refs for cleanup
  const passwordInputRef = useRef(null);
  const lockoutTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // 🔒 Check lockout status on mount
  useEffect(() => {
    if (lockoutTime && Date.now() < lockoutTime) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      setRemainingTime(remaining);

      lockoutTimerRef.current = setInterval(() => {
        const newRemaining = Math.ceil((lockoutTime - Date.now()) / 1000);
        if (newRemaining <= 0) {
          // Reset lockout
          setLockoutTime(null);
          setLoginAttempts(0);
          sessionStorage.removeItem('lockoutTime');
          sessionStorage.removeItem('loginAttempts');
          clearInterval(lockoutTimerRef.current);
        }
        setRemainingTime(newRemaining);
      }, 1000);
    }

    return () => {
      if (lockoutTimerRef.current) {
        clearInterval(lockoutTimerRef.current);
      }
    };
  }, [lockoutTime]);

  // 🔒 Format remaining time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data) => {
    // 🔒 Check if locked out
    if (lockoutTime && Date.now() < lockoutTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Account Temporarily Locked',
        text: `Too many failed attempts. Please try again in ${formatTime(remainingTime)}`,
        confirmButtonColor: 'var(--main-color)',
        background: 'var(--card-bg)',
        color: 'var(--primary-text)',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (result.success) {
        // 🔒 Reset attempts on success
        setLoginAttempts(0);
        sessionStorage.removeItem('loginAttempts');
        sessionStorage.removeItem('lockoutTime');

        // 🔒 Clear sensitive data from memory
        data.password = '';
        reset();
      } else {
        // 🔒 Increment failed attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        sessionStorage.setItem('loginAttempts', newAttempts.toString());

        if (newAttempts >= MAX_ATTEMPTS) {
          // 🔒 Lock account
          const lockTime = Date.now() + LOCKOUT_DURATION;
          setLockoutTime(lockTime);
          sessionStorage.setItem('lockoutTime', lockTime.toString());

          Swal.fire({
            icon: 'error',
            title: 'Account Locked',
            text: `Too many failed login attempts. Account locked for 15 minutes.`,
            confirmButtonColor: 'var(--main-color)',
            background: 'var(--card-bg)',
            color: 'var(--primary-text)',
          });
        } else {
          const remainingAttempts = MAX_ATTEMPTS - newAttempts;
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            html: `
              <p>${result.error || 'Invalid credentials'}</p>
              <p class="text-warning">
                <strong>${remainingAttempts}</strong> attempt${remainingAttempts > 1 ? 's' : ''} remaining
              </p>
            `,
            confirmButtonColor: 'var(--main-color)',
            background: 'var(--card-bg)',
            color: 'var(--primary-text)',
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
        confirmButtonColor: 'var(--main-color)',
        background: 'var(--card-bg)',
        color: 'var(--primary-text)',
      });
    } finally {
      setIsLoading(false);
      // 🔒 Clear password field
      if (passwordInputRef.current) {
        passwordInputRef.current.value = '';
      }
    }
  };

  // 🔒 Check if form is locked
  const isLocked = lockoutTime && Date.now() < lockoutTime;

  return (
    <form className='auth-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Security Warning Badge */}
      {loginAttempts > 0 && !isLocked && (
        <div className='security-warning'>
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>
            {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''}.
            {MAX_ATTEMPTS - loginAttempts} remaining.
          </span>
        </div>
      )}

      {/* Lockout Warning */}
      {isLocked && (
        <div className='lockout-warning'>
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>Account locked. Try again in {formatTime(remainingTime)}</span>
        </div>
      )}

      {/* Email Field */}
      <div className='form-group'>
        <label
          htmlFor='login-email'
          ar-data='البريد الإلكتروني'
          en-data='Email Address'>
          Email Address
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
          <input
            id='login-email'
            type='email'
            placeholder='example@email.com'
            autoComplete='email'
            disabled={isLocked}
            {...register('email')}
            className={errors.email ? 'error' : ''}
          />
        </div>
        {errors.email && (
          <span className='error-message'>{errors.email.message}</span>
        )}
      </div>

      {/* Password Field */}
      <div className='form-group'>
        <label
          htmlFor='login-password'
          ar-data='كلمة المرور'
          en-data='Password'>
          Password
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faLock} className='input-icon' />
          <input
            id='login-password'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            autoComplete='current-password'
            disabled={isLocked}
            ref={passwordInputRef}
            {...register('password')}
            className={errors.password ? 'error' : ''}
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLocked}
            aria-label='Toggle password visibility'>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errors.password && (
          <span className='error-message'>{errors.password.message}</span>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className='form-row'>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            disabled={isLocked}
            {...register('rememberMe')}
          />
          <span ar-data='تذكرني' en-data='Remember me'>
            Remember me
          </span>
        </label>
        <button
          type='button'
          className='link-button'
          onClick={onForgotPassword}
          disabled={isLocked}
          ar-data='نسيت كلمة المرور؟'
          en-data='Forgot Password?'>
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={isLoading || isLocked}>
        {isLoading ? (
          <>
            <span className='spinner'></span>
            <span ar-data='جاري تسجيل الدخول...' en-data='Logging in...'>
              Logging in...
            </span>
          </>
        ) : isLocked ? (
          <>
            <FontAwesomeIcon icon={faShieldAlt} />
            <span ar-data='الحساب مقفل' en-data='Account Locked'>
              Account Locked
            </span>
          </>
        ) : (
          <span ar-data='تسجيل الدخول' en-data='Login'>
            Login
          </span>
        )}
      </button>

      {/* Security Notice */}
      <div className='security-notice'>
        <small>
          <FontAwesomeIcon icon={faShieldAlt} className='me-1' />
          <span
            ar-data='اتصال آمن ومشفر'
            en-data='Secure & encrypted connection'>
            Secure & encrypted connection
          </span>
        </small>
      </div>

      {/* Switch to Register */}
      <div className='form-footer'>
        <p>
          <span ar-data='ليس لديك حساب؟' en-data="Don't have an account?">
            Don't have an account?
          </span>{' '}
          <button
            type='button'
            className='link-button primary'
            onClick={onSwitchToRegister}
            disabled={isLocked}
            ar-data='سجل الآن'
            en-data='Register now'>
            Register now
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
