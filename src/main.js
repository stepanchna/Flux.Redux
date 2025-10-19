import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './ui/App';
async function prepare() {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser');
        await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
    }
}
prepare().then(() => {
    createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
});
