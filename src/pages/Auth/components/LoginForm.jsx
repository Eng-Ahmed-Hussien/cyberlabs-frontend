import React, { useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

const LoginForm = ({ onSwitchToRegister, onForgotPassword }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div className='form-group'>
        <label
          htmlFor='email'
          ar-data='البريد الإلكتروني'
          en-data='Email Address'>
          Email Address
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
          <input
            id='email'
            type='email'
            placeholder='example@email.com'
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
        <label htmlFor='password' ar-data='كلمة المرور' en-data='Password'>
          Password
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faLock} className='input-icon' />
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            {...register('password')}
            className={errors.password ? 'error' : ''}
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowPassword(!showPassword)}
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
          <input type='checkbox' {...register('rememberMe')} />
          <span ar-data='تذكرني' en-data='Remember me'>
            Remember me
          </span>
        </label>
        <button
          type='button'
          className='link-button'
          onClick={onForgotPassword}
          ar-data='نسيت كلمة المرور؟'
          en-data='Forgot Password?'>
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={isLoading}>
        {isLoading ? (
          <>
            <span className='spinner'></span>
            <span ar-data='جاري تسجيل الدخول...' en-data='Logging in...'>
              Logging in...
            </span>
          </>
        ) : (
          <span ar-data='تسجيل الدخول' en-data='Login'>
            Login
          </span>
        )}
      </button>

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
