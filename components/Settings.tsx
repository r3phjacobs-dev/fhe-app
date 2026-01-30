
import React, { useState } from 'react';

// Added props interface to fix type error in App.tsx
interface SettingsProps {
  userPoints: number;
}

const Settings: React.FC<SettingsProps> = ({ userPoints }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

  const toggleNotifications = () => {
    setNotifications(!notifications);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-gray-800 shadow-xl mb-3">
          {tgUser?.first_name?.[0] || 'U'}
        </div>
        <h3 className="font-bold text-xl">{tgUser?.first_name || 'User'} {tgUser?.last_name || ''}</h3>
        <p className="text-gray-500 text-xs">@{tgUser?.username || 'nexus_user'}</p>
        
        {/* Added point display in the profile section */}
        <div className="mt-3 inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 shadow-sm">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{userPoints} PTS</span>
        </div>
      </div>

      {/* Settings Group */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-700 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🔔</span>
            <span className="text-sm font-medium">Notifikasi</span>
          </div>
          <button 
            onClick={toggleNotifications}
            className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🌓</span>
            <span className="text-sm font-medium">Mode Gelap</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🌐</span>
            <span className="text-sm font-medium">Bahasa</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">Indonesia ➔</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-700 overflow-hidden shadow-sm">
        <div className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3 text-red-500">
            <span className="text-xl">🚪</span>
            <span className="text-sm font-bold">Keluar</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Nexus TMA v1.0.4</p>
        <p className="text-[10px] text-gray-300 mt-1">Dibuat dengan ❤️ untuk komunitas</p>
      </div>
    </div>
  );
};

export default Settings;
