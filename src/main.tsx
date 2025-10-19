// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './ui/App';

async function prepare() {
  // MSW запускаем ТОЛЬКО в dev, на проде (GitHub Pages) не трогаем
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');

    // service worker url с учётом base (для dev это "/")
    const swUrl = `${import.meta.env.BASE_URL}mockServiceWorker.js`;

    await worker.start({
      serviceWorker: { url: swUrl },
    });
  }
}

prepare().then(() => {
  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element #root not found');

  createRoot(rootEl).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
