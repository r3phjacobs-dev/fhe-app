
const tg = window.Telegram?.WebApp;

export const safeStorage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // CloudStorage hanya didukung pada v6.9+
      if (tg?.isVersionAtLeast('6.9')) {
        tg.CloudStorage.setItem(key, value, (err, success) => {
          resolve(!!success);
        });
      } else {
        // Fallback ke localStorage untuk versi lama (seperti 6.0)
        try {
          localStorage.setItem(key, value);
          resolve(true);
        } catch (e) {
          resolve(false);
        }
      }
    });
  },

  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (tg?.isVersionAtLeast('6.9')) {
        tg.CloudStorage.getItem(key, (err, value) => {
          resolve(value || null);
        });
      } else {
        resolve(localStorage.getItem(key));
      }
    });
  }
};
