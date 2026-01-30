
import React, { useState } from 'react';
import { Task } from '../types';

interface TasksProps {
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Tasks: React.FC<TasksProps> = ({ setUserPoints }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Ikuti Channel Nexus', completed: false, points: 100 },
    { id: '2', title: 'Undang 3 Teman', completed: false, points: 500 },
    { id: '3', title: 'Bagikan ke Story', completed: true, points: 50 },
    { id: '4', title: 'Tonton Video Tutorial', completed: false, points: 150 },
    { id: '5', title: 'Check-in Harian', completed: false, points: 20 },
  ]);

  const handleClaim = (id: string, points: number) => {
    // TMA Haptic
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }

    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
    setUserPoints(prev => prev + points);
    
    // TMA Show Alert
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(`Selamat! Kamu mendapatkan ${points} PTS!`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="px-1">
        <h2 className="text-2xl font-bold">Pusat Tugas</h2>
        <p className="text-sm text-gray-500">Selesaikan tugas untuk mendapatkan lebih banyak PTS.</p>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              task.completed 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-60' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                task.completed ? 'bg-gray-200 text-gray-400' : 'bg-blue-100 text-blue-600'
              }`}>
                {task.completed ? '✓' : '⚡'}
              </div>
              <div>
                <h4 className="text-sm font-bold">{task.title}</h4>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-blue-500 font-bold">+{task.points}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">PTS</span>
                </div>
              </div>
            </div>

            {!task.completed ? (
              <button 
                onClick={() => handleClaim(task.id, task.points)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-all shadow-md shadow-blue-100"
              >
                Klaim
              </button>
            ) : (
              <span className="text-xs font-medium text-gray-400 px-2 italic">Selesai</span>
            )}
          </div>
        ))}
      </div>

      {/* Referral Card */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-1">Undang Teman</h3>
          <p className="text-indigo-100 text-xs mb-4">Dapatkan bonus 10% dari setiap PTS yang mereka kumpulkan!</p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl active:scale-95 transition-all">
            Bagikan Link
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-4 top-4 w-12 h-12 bg-indigo-400/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default Tasks;
