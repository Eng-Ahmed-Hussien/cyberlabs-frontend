import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { loadGA, initGA, trackPageView } from '@/gtag';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import Preloader from '@/components/Preloader/Preloader';
import './App.css';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Initialize Google Analytics
  useEffect(() => {
    loadGA();
    initGA();
  }, []);

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='App'>
      {/* Preloader */}
      <Preloader loading={loading} />

      {/* Theme & Language Switchers */}
      {!loading && (
        <>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </>
      )}

      {/* Main Routes */}
      {!loading && (
        <div className='main-content'>
          <AppRoutes />
        </div>
      )}
    </div>
  );
}

export default App;
