
import React from 'react';
import { Tab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  userPoints?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userPoints = 0 }) => {
  const navItems = [
    { id: 'home', label: 'Market', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )},
    { id: 'tasks', label: 'Tugas', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { id: 'chat', label: 'AI Expert', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )},
    { id: 'settings', label: 'Profil', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  const handleTabChange = (tabId: Tab) => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden bg-[var(--tg-theme-bg-color, #f4f7f6)]">
      {/* Brand Header */}
      <header className="bg-[#1b5e20] text-white p-5 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-lg font-black tracking-tight uppercase">FHE Intelligence</h1>
          <p className="text-[10px] opacity-80 font-medium text-left">Algo Trading Community</p>
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30 flex items-center space-x-2">
          <span className="text-sm font-black">{userPoints}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">PTS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 safe-area-bottom z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as Tab)}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors"
            >
              {item.icon(activeTab === item.id)}
              <span className={`text-[10px] font-bold ${activeTab === item.id ? 'text-[#1b5e20]' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
