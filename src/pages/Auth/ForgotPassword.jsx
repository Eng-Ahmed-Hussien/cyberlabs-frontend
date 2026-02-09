import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/utils/validation/authSchemas';
import { authService } from '@/api/services';
import AuthLayout from './components/AuthLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code & Password
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Email Form
  const emailForm = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  // Step 2: Reset Form
  const resetForm = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleSendCode = async (data) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setEmail(data.email);
      setStep(2);
      Swal.fire({
        icon: 'success',
        title: 'Code Sent!',
        text: 'Check your email for the verification code',
        confirmButtonColor: 'var(--main-color)',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send code',
        confirmButtonColor: 'var(--main-color)',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        code: data.code,
        password: data.password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Password reset successfully',
        confirmButtonColor: 'var(--main-color)',
      });
      navigate('/auth');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to reset password',
        confirmButtonColor: 'var(--main-color)',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const title = {
    en: step === 1 ? 'Forgot Password?' : 'Reset Password',
    ar: step === 1 ? 'نسيت كلمة المرور؟' : 'إعادة تعيين كلمة المرور',
  };

  const subtitle = {
    en:
      step === 1
        ? 'Enter your email to receive a reset code'
        : 'Enter the code and your new password',
    ar:
      step === 1
        ? 'أدخل بريدك الإلكتروني لتلقي رمز التحقق'
        : 'أدخل الرمز وكلمة المرور الجديدة',
  };

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <button
        className='back-button'
        onClick={() => (step === 1 ? navigate('/auth') : setStep(1))}
        ar-data='رجوع'
        en-data='Back'>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </button>

      {step === 1 ? (
        <form
          className='auth-form'
          onSubmit={emailForm.handleSubmit(handleSendCode)}>
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
                {...emailForm.register('email')}
                className={emailForm.formState.errors.email ? 'error' : ''}
              />
            </div>
            {emailForm.formState.errors.email && (
              <span className='error-message'>
                {emailForm.formState.errors.email.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-primary btn-block'
            disabled={isLoading}>
            {isLoading ? (
              <>
                <span className='spinner'></span>
                <span ar-data='جاري الإرسال...' en-data='Sending...'>
                  Sending...
                </span>
              </>
            ) : (
              <span ar-data='إرسال الرمز' en-data='Send Code'>
                Send Code
              </span>
            )}
          </button>
        </form>
      ) : (
        <form
          className='auth-form'
          onSubmit={resetForm.handleSubmit(handleResetPassword)}>
          <div className='form-group'>
            <label
              htmlFor='code'
              ar-data='رمز التحقق'
              en-data='Verification Code'>
              Verification Code
            </label>
            <div className='input-wrapper'>
              <input
                id='code'
                type='text'
                placeholder='000000'
                maxLength='6'
                {...resetForm.register('code')}
                className={resetForm.formState.errors.code ? 'error' : ''}
              />
            </div>
            {resetForm.formState.errors.code && (
              <span className='error-message'>
                {resetForm.formState.errors.code.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label
              htmlFor='password'
              ar-data='كلمة المرور الجديدة'
              en-data='New Password'>
              New Password
            </label>
            <div className='input-wrapper'>
              <FontAwesomeIcon icon={faLock} className='input-icon' />
              <input
                id='password'
                type='password'
                placeholder='••••••••'
                {...resetForm.register('password')}
                className={resetForm.formState.errors.password ? 'error' : ''}
              />
            </div>
            {resetForm.formState.errors.password && (
              <span className='error-message'>
                {resetForm.formState.errors.password.message}
              </span>
            )}
          </div>

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
                type='password'
                placeholder='••••••••'
                {...resetForm.register('confirmPassword')}
                className={
                  resetForm.formState.errors.confirmPassword ? 'error' : ''
                }
              />
            </div>
            {resetForm.formState.errors.confirmPassword && (
              <span className='error-message'>
                {resetForm.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-primary btn-block'
            disabled={isLoading}>
            {isLoading ? (
              <>
                <span className='spinner'></span>
                <span ar-data='جاري إعادة التعيين...' en-data='Resetting...'>
                  Resetting...
                </span>
              </>
            ) : (
              <span ar-data='إعادة تعيين كلمة المرور' en-data='Reset Password'>
                Reset Password
              </span>
            )}
          </button>

          <button
            type='button'
            className='resend-button'
            onClick={() => handleSendCode({ email })}
            ar-data='إعادة إرسال الرمز'
            en-data='Resend Code'>
            Resend Code
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
