/* ========================================
   Internationalization Helper
   ======================================== */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { storage } from './storage';

// Translation resources
const resources = {
  en: {
    translation: {
      // Auth
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      logout: 'Logout',

      // Validation
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      nameRequired: 'Name is required',
      invalidEmail: 'Invalid email format',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordsNotMatch: 'Passwords do not match',

      // Messages
      welcomeBack: 'Welcome Back!',
      createAccount: 'Create Account',
      verifyEmail: 'Verify Email',
      enterOTP: 'Enter OTP',
      resendOTP: 'Resend OTP',
      submit: 'Submit',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',

      // Dashboard
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',

      // Theme
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
  },
  ar: {
    translation: {
      // Auth
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم',
      forgotPassword: 'نسيت كلمة المرور؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      signIn: 'دخول',
      signUp: 'تسجيل',
      logout: 'تسجيل خروج',

      // Validation
      emailRequired: 'البريد الإلكتروني مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      nameRequired: 'الاسم مطلوب',
      invalidEmail: 'البريد الإلكتروني غير صحيح',
      passwordTooShort: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',

      // Messages
      welcomeBack: 'مرحباً بعودتك!',
      createAccount: 'إنشاء حساب جديد',
      verifyEmail: 'تأكيد البريد الإلكتروني',
      enterOTP: 'أدخل رمز التحقق',
      resendOTP: 'إعادة إرسال الرمز',
      submit: 'إرسال',
      loading: 'جاري التحميل...',
      success: 'نجح',
      error: 'خطأ',

      // Dashboard
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',

      // Theme
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
    },
  },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: storage.getLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
