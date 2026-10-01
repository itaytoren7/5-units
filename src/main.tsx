import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { BadgePop } from './motivation/components';
import { MotivationProvider } from './motivation/store';
import { StoreProvider } from './state/store';
import './styles.css';

registerSW({ immediate: true });

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <StoreProvider>
        <MotivationProvider>
          <App />
          <BadgePop />
        </MotivationProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
