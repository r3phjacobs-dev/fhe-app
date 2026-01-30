
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  } catch (err: any) {
    console.error("Initialization Error:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: #721c24; background: #f8d7da; margin: 20px; border-radius: 12px;">
        <h2 style="margin:0 0 10px 0;">Sistem Sibuk</h2>
        <p style="font-size:14px; margin-bottom:15px;">Aplikasi gagal diinisialisasi. Silakan muat ulang.</p>
        <button onclick="location.reload()" style="width:100%; padding:12px; background:#1b5e20; color:white; border:none; border-radius:8px; font-weight:bold;">MUAT ULANG</button>
      </div>
    `;
  }
}
