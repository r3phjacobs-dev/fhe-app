
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
      <svg className={`w-5 h-5 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )},
    { id: 'tasks', label: 'Tugas', icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { id: 'chat', label: 'AI Expert', icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )},
    { id: 'settings', label: 'Profil', icon: (active: boolean) => (
      <svg className={`w-5 h-5 ${active ? 'text-[#1b5e20]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="flex flex-col h-screen h-[100dvh] max-w-md mx-auto relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Header Tetap */}
      <header className="bg-[#1b5e20] text-white p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex flex-col">
          <h1 className="text-sm font-black tracking-tight uppercase leading-tight">FHE Intelligence</h1>
          <p className="text-[9px] opacity-70 font-medium">Algo Trading Hub</p>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5">
          <span className="text-xs font-bold">{userPoints}</span>
          <span className="text-[8px] font-bold opacity-80">PTS</span>
        </div>
      </header>

      {/* Area Konten Scrollable */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-20 custom-scrollbar">
        {children}
      </main>

      {/* Navigasi Bawah Tetap */}
      <nav className="shrink-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as Tab)}
              className="flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all active:opacity-50"
            >
              {item.icon(activeTab === item.id)}
              <span className={`text-[9px] font-bold ${activeTab === item.id ? 'text-[#1b5e20]' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
};

export default Layout;
