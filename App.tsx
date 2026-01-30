
import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import Layout from './components/Layout';
import Home from './components/Home';
import AIChat from './components/AIChat';
import Tasks from './components/Tasks';
import Settings from './components/Settings';
import { safeStorage } from './services/storage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [userPoints, setUserPoints] = useState<number>(0);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      if (tg.isVersionAtLeast('6.1')) {
        tg.setHeaderColor('#1b5e20');
        tg.setBackgroundColor('#f4f7f6');
      }
    }

    safeStorage.getItem('user_points').then(val => {
      if (val) setUserPoints(parseInt(val, 10));
    });

    if (typeof window.show_10524338 === 'function') {
      try {
        window.show_10524338({
          type: 'inApp',
          inAppSettings: {
            frequency: 2,
            capping: 0.1,
            interval: 30,
            timeout: 5,
            everyPage: false
          }
        });
      } catch (e) {
        console.warn("Monetag gagal dimuat");
      }
    }
  }, []);

  useEffect(() => {
    safeStorage.setItem('user_points', userPoints.toString());
  }, [userPoints]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'chat':
        return <AIChat />;
      case 'tasks':
        return <Tasks setUserPoints={setUserPoints} />;
      case 'settings':
        return <Settings userPoints={userPoints} />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userPoints={userPoints}>
      {renderContent()}
    </Layout>
  );
};

export default App;
