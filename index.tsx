
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err: any) {
    console.error("React Render Error:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: sans-serif;">
        <h2 style="margin-bottom:10px;">Gagal Memulai Aplikasi</h2>
        <p style="font-size:14px;">${err.message || 'Error tidak diketahui'}</p>
        <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#1b5e20; color:white; border:none; border-radius:10px;">Coba Lagi</button>
      </div>
    `;
  }
}
