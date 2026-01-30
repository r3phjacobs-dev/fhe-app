
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Gagal menemukan elemen root!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Render Error:", err);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Gagal memuat aplikasi. Silakan muat ulang.</div>`;
  }
}
