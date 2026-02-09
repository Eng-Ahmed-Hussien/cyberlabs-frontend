import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyEmailSchema } from '@/utils/validation/authSchemas';
import { authService } from '@/api/services';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from './components/AuthLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.verifyEmail(data.code);
      updateUser({ ...user, emailVerified: true });
      Swal.fire({
        icon: 'success',
        title: 'Email Verified!',
        text: 'Your email has been verified successfully',
        confirmButtonColor: 'var(--main-color)',
      });
      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error.response?.data?.message || 'Invalid verification code',
        confirmButtonColor: 'var(--main-color)',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await authService.resendVerificationCode();
      setCountdown(60);
      setCanResend(false);
      Swal.fire({
        icon: 'success',
        title: 'Code Sent!',
        text: 'A new verification code has been sent to your email',
        timer: 2000,
        confirmButtonColor: 'var(--main-color)',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to resend code. Please try again',
        confirmButtonColor: 'var(--main-color)',
      });
    }
  };

  const title = {
    en: 'Verify Your Email',
    ar: 'تأكيد بريدك الإلكتروني',
  };

  const subtitle = {
    en: `We sent a verification code to ${user?.email || 'your email'}`,
    ar: `لقد أرسلنا رمز التحقق إلى ${user?.email || 'بريدك الإلكتروني'}`,
  };

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <div className='verify-email-container'>
        <div className='email-icon'>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>

        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label
              htmlFor='code'
              ar-data='رمز التحقق'
              en-data='Verification Code'>
              Verification Code
            </label>
            <div className='code-input-wrapper'>
              <input
                id='code'
                type='text'
                placeholder='000000'
                maxLength='6'
                {...register('code')}
                className={`code-input ${errors.code ? 'error' : ''}`}
              />
            </div>
            {errors.code && (
              <span className='error-message'>{errors.code.message}</span>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-primary btn-block'
            disabled={isLoading}>
            {isLoading ? (
              <>
                <span className='spinner'></span>
                <span ar-data='جاري التحقق...' en-data='Verifying...'>
                  Verifying...
                </span>
              </>
            ) : (
              <span ar-data='تأكيد البريد الإلكتروني' en-data='Verify Email'>
                Verify Email
              </span>
            )}
          </button>

          <div className='resend-section'>
            {!canResend ? (
              <p className='countdown-text'>
                <span ar-data='إعادة الإرسال خلال' en-data='Resend code in'>
                  Resend code in
                </span>{' '}
                <strong>{countdown}s</strong>
              </p>
            ) : (
              <button
                type='button'
                className='resend-button'
                onClick={handleResendCode}
                ar-data='إعادة إرسال الرمز'
                en-data='Resend Code'>
                Resend Code
              </button>
            )}
          </div>
        </form>

        <div className='verify-footer'>
          <p
            ar-data='لم تستلم الرمز؟ تحقق من مجلد البريد المزعج'
            en-data="Didn't receive the code? Check your spam folder">
            Didn't receive the code? Check your spam folder
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
