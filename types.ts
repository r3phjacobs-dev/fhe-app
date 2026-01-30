
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type Tab = 'home' | 'chat' | 'tasks' | 'settings';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        isVersionAtLeast: (version: string) => boolean;
        HapticFeedback: any;
        showAlert: (message: string) => void;
        initDataUnsafe: any;
        CloudStorage: {
          setItem: (key: string, value: string, callback?: (err: any, success: any) => void) => void;
          getItem: (key: string, callback: (err: any, value: any) => void) => void;
        };
      };
    };
    show_10524338: (config: any) => void;
  }
}
