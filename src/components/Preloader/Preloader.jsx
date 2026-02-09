import React from 'react';
import './style.css';
import logo from '@/assets/images/logo.png';

const Preloader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className='preloader'>
      <div className='loading-container'>
        <div className='loading'></div>
        <div id='loading-icon'>
          <img src={logo} alt='Loading...' />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
