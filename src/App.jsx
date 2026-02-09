import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { AuthProvider } from '@/contexts/AuthContext';
import { loadGA, initGA, trackPageView } from '@/gtag';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import LanguageHandler from '@/components/LanguageSwitcher/LanguageHandler';
import Preloader from '@/components/Preloader/Preloader';
import './App.css';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGA();
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <LanguageHandler />

      <Preloader loading={loading} />

      {!loading && (
        <>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </>
      )}

      {!loading && (
        <div className='main-content'>
          <AppRoutes />
        </div>
      )}
    </AuthProvider>
  );
}

export default App;
