import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import './AuthLayout.css';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className='auth-layout'>
      {/* Header with Logo & Switchers */}
      <div className='auth-header'>
        <Link to='/' className='auth-logo'>
          <h2>
            Cyber <span>Labs</span>
          </h2>
        </Link>
        <div className='auth-switchers'>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className='auth-container'>
        <div className='auth-card'>
          <div className='auth-card-header'>
            <h1 ar-data={title?.ar} en-data={title?.en}>
              {title?.en}
            </h1>
            {subtitle && (
              <p ar-data={subtitle?.ar} en-data={subtitle?.en}>
                {subtitle?.en}
              </p>
            )}
          </div>
          <div className='auth-card-body'>{children}</div>
        </div>

        {/* Decorative Elements */}
        <div className='auth-decoration'>
          <div className='circle circle-1'></div>
          <div className='circle circle-2'></div>
          <div className='circle circle-3'></div>
        </div>
      </div>

      {/* Footer */}
      <div className='auth-footer'>
        <p
          ar-data='جميع الحقوق محفوظة © 2026'
          en-data='© 2026 CyberLabs. All rights reserved.'>
          © 2026 CyberLabs. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
