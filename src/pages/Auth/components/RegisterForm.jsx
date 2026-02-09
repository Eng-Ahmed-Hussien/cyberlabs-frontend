import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/utils/validation/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faUser,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import './AuthForms.css';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const password = watch('password');

  // Password strength checker
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&#]/.test(pwd)) strength++;

    const levels = [
      { strength: 1, label: 'Weak', labelAr: 'ضعيفة', color: '#ef4444' },
      { strength: 2, label: 'Fair', labelAr: 'متوسطة', color: '#f59e0b' },
      { strength: 3, label: 'Good', labelAr: 'جيدة', color: '#3b82f6' },
      { strength: 4, label: 'Strong', labelAr: 'قوية', color: '#10b981' },
    ];

    return levels[strength - 1] || { strength: 0, label: '', color: '' };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div className='form-group'>
        <label htmlFor='name' ar-data='الاسم الكامل' en-data='Full Name'>
          Full Name
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faUser} className='input-icon' />
          <input
            id='name'
            type='text'
            placeholder='John Doe'
            {...register('name')}
            className={errors.name ? 'error' : ''}
          />
        </div>
        {errors.name && (
          <span className='error-message'>{errors.name.message}</span>
        )}
      </div>

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

      {/* Password Field with Strength Indicator */}
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

        {/* Password Strength Indicator */}
        {password && (
          <div className='password-strength'>
            <div className='strength-bar'>
              <div
                className='strength-fill'
                style={{
                  width: `${(passwordStrength.strength / 4) * 100}%`,
                  backgroundColor: passwordStrength.color,
                }}
              />
            </div>
            <span style={{ color: passwordStrength.color }}>
              {passwordStrength.label}
            </span>
          </div>
        )}

        {/* Password Requirements */}
        <div className='password-requirements'>
          <div className={password?.length >= 8 ? 'valid' : 'invalid'}>
            <FontAwesomeIcon
              icon={password?.length >= 8 ? faCheckCircle : faTimesCircle}
            />
            <span ar-data='8 أحرف على الأقل' en-data='At least 8 characters'>
              At least 8 characters
            </span>
          </div>
          <div
            className={
              /[A-Z]/.test(password) && /[a-z]/.test(password)
                ? 'valid'
                : 'invalid'
            }>
            <FontAwesomeIcon
              icon={
                /[A-Z]/.test(password) && /[a-z]/.test(password)
                  ? faCheckCircle
                  : faTimesCircle
              }
            />
            <span
              ar-data='أحرف كبيرة وصغيرة'
              en-data='Upper & lowercase letters'>
              Upper & lowercase letters
            </span>
          </div>
          <div className={/\d/.test(password) ? 'valid' : 'invalid'}>
            <FontAwesomeIcon
              icon={/\d/.test(password) ? faCheckCircle : faTimesCircle}
            />
            <span ar-data='رقم واحد على الأقل' en-data='At least one number'>
              At least one number
            </span>
          </div>
          <div className={/[@$!%*?&#]/.test(password) ? 'valid' : 'invalid'}>
            <FontAwesomeIcon
              icon={/[@$!%*?&#]/.test(password) ? faCheckCircle : faTimesCircle}
            />
            <span ar-data='رمز خاص واحد' en-data='One special character'>
              One special character
            </span>
          </div>
        </div>

        {errors.password && (
          <span className='error-message'>{errors.password.message}</span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className='form-group'>
        <label
          htmlFor='confirmPassword'
          ar-data='تأكيد كلمة المرور'
          en-data='Confirm Password'>
          Confirm Password
        </label>
        <div className='input-wrapper'>
          <FontAwesomeIcon icon={faLock} className='input-icon' />
          <input
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='••••••••'
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'error' : ''}
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label='Toggle confirm password visibility'>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errors.confirmPassword && (
          <span className='error-message'>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className='form-group'>
        <label className='checkbox-label'>
          <input type='checkbox' {...register('terms')} />
          <span>
            <span ar-data='أوافق على' en-data='I agree to the'>
              I agree to the
            </span>{' '}
            <a href='/terms' target='_blank' className='link'>
              <span ar-data='الشروط والأحكام' en-data='Terms & Conditions'>
                Terms & Conditions
              </span>
            </a>
          </span>
        </label>
        {errors.terms && (
          <span className='error-message'>{errors.terms.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={isLoading}>
        {isLoading ? (
          <>
            <span className='spinner'></span>
            <span ar-data='جاري إنشاء الحساب...' en-data='Creating account...'>
              Creating account...
            </span>
          </>
        ) : (
          <span ar-data='إنشاء حساب' en-data='Create Account'>
            Create Account
          </span>
        )}
      </button>

      {/* Switch to Login */}
      <div className='form-footer'>
        <p>
          <span ar-data='لديك حساب بالفعل؟' en-data='Already have an account?'>
            Already have an account?
          </span>{' '}
          <button
            type='button'
            className='link-button primary'
            onClick={onSwitchToLogin}
            ar-data='سجل دخول'
            en-data='Login'>
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
