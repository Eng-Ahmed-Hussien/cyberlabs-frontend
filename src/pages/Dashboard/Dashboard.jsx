import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { id: 'overview', label: t('dashboard.overview'), icon: '📊' },
    { id: 'labs', label: t('dashboard.labs'), icon: '🔬' },
    { id: 'challenges', label: t('dashboard.challenges'), icon: '🎯' },
    { id: 'progress', label: t('dashboard.progress'), icon: '📈' },
    { id: 'settings', label: t('dashboard.settings'), icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className='dashboard-content'>
            <h2>
              {t('dashboard.welcome')}, {user?.name || user?.email}!
            </h2>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-icon'>🔬</div>
                <div className='stat-info'>
                  <h3>{t('dashboard.activeLabs')}</h3>
                  <p className='stat-number'>5</p>
                </div>
              </div>
              <div className='stat-card'>
                <div className='stat-icon'>✅</div>
                <div className='stat-info'>
                  <h3>{t('dashboard.completedChallenges')}</h3>
                  <p className='stat-number'>12</p>
                </div>
              </div>
              <div className='stat-card'>
                <div className='stat-icon'>🏆</div>
                <div className='stat-info'>
                  <h3>{t('dashboard.achievements')}</h3>
                  <p className='stat-number'>8</p>
                </div>
              </div>
              <div className='stat-card'>
                <div className='stat-icon'>⭐</div>
                <div className='stat-info'>
                  <h3>{t('dashboard.totalPoints')}</h3>
                  <p className='stat-number'>1,250</p>
                </div>
              </div>
            </div>
            <div className='recent-activity'>
              <h3>{t('dashboard.recentActivity')}</h3>
              <div className='activity-list'>
                <div className='activity-item'>
                  <span className='activity-icon'>🔬</span>
                  <div className='activity-details'>
                    <p>{t('dashboard.startedLab')}: SQL Injection</p>
                    <span className='activity-time'>
                      2 {t('dashboard.hoursAgo')}
                    </span>
                  </div>
                </div>
                <div className='activity-item'>
                  <span className='activity-icon'>✅</span>
                  <div className='activity-details'>
                    <p>{t('dashboard.completedChallenge')}: XSS Attack</p>
                    <span className='activity-time'>
                      5 {t('dashboard.hoursAgo')}
                    </span>
                  </div>
                </div>
                <div className='activity-item'>
                  <span className='activity-icon'>🏆</span>
                  <div className='activity-details'>
                    <p>{t('dashboard.earnedBadge')}: Security Expert</p>
                    <span className='activity-time'>
                      1 {t('dashboard.dayAgo')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'labs':
        return (
          <div className='dashboard-content'>
            <h2>{t('dashboard.labs')}</h2>
            <div className='labs-grid'>
              <div className='lab-card'>
                <h3>SQL Injection Lab</h3>
                <p>
                  {t('dashboard.difficulty')}: {t('dashboard.intermediate')}
                </p>
                <div className='lab-progress'>
                  <div className='progress-bar'>
                    <div
                      className='progress-fill'
                      style={{ width: '60%' }}></div>
                  </div>
                  <span>60% {t('dashboard.complete')}</span>
                </div>
                <button className='btn btn-primary'>
                  {t('dashboard.continue')}
                </button>
              </div>
              <div className='lab-card'>
                <h3>Cross-Site Scripting</h3>
                <p>
                  {t('dashboard.difficulty')}: {t('dashboard.beginner')}
                </p>
                <div className='lab-progress'>
                  <div className='progress-bar'>
                    <div
                      className='progress-fill'
                      style={{ width: '100%' }}></div>
                  </div>
                  <span>100% {t('dashboard.complete')}</span>
                </div>
                <button className='btn btn-secondary'>
                  {t('dashboard.review')}
                </button>
              </div>
              <div className='lab-card'>
                <h3>CSRF Protection</h3>
                <p>
                  {t('dashboard.difficulty')}: {t('dashboard.advanced')}
                </p>
                <div className='lab-progress'>
                  <div className='progress-bar'>
                    <div
                      className='progress-fill'
                      style={{ width: '0%' }}></div>
                  </div>
                  <span>0% {t('dashboard.complete')}</span>
                </div>
                <button className='btn btn-primary'>
                  {t('dashboard.start')}
                </button>
              </div>
            </div>
          </div>
        );
      case 'challenges':
        return (
          <div className='dashboard-content'>
            <h2>{t('dashboard.challenges')}</h2>
            <p>{t('dashboard.challengesDescription')}</p>
          </div>
        );
      case 'progress':
        return (
          <div className='dashboard-content'>
            <h2>{t('dashboard.progress')}</h2>
            <p>{t('dashboard.progressDescription')}</p>
          </div>
        );
      case 'settings':
        return (
          <div className='dashboard-content'>
            <h2>{t('dashboard.settings')}</h2>
            <div className='settings-section'>
              <h3>{t('dashboard.accountSettings')}</h3>
              <div className='setting-item'>
                <label>{t('common.email')}</label>
                <input type='email' value={user?.email} disabled />
              </div>
              <div className='setting-item'>
                <label>{t('common.name')}</label>
                <input type='text' value={user?.name || ''} />
              </div>
              <button className='btn btn-primary'>{t('common.save')}</button>
            </div>
          </div>
        );
      default:
        return <div>{t('dashboard.selectSection')}</div>;
    }
  };

  return (
    <div className='dashboard-container'>
      <aside className='sidebar'>
        <div className='sidebar-header'>
          <h1>🔐 CyberLabs</h1>
          <button className='lang-toggle' onClick={toggleLanguage}>
            {language === 'en' ? '🇸🇦 AR' : '🇺🇸 EN'}
          </button>
        </div>
        <nav className='sidebar-nav'>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}>
              <span className='nav-icon'>{item.icon}</span>
              <span className='nav-label'>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className='sidebar-footer'>
          <div className='user-info'>
            <div className='user-avatar'>
              {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>
            <div className='user-details'>
              <p className='user-name'>{user?.name || 'User'}</p>
              <p className='user-email'>{user?.email}</p>
            </div>
          </div>
          <button className='btn btn-logout' onClick={handleLogout}>
            {t('auth.logout')} 🚪
          </button>
        </div>
      </aside>
      <main className='dashboard-main'>{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
