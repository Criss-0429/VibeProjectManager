import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { VMSProvider } from './lib/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VMSProvider>
      <App />
    </VMSProvider>
  </StrictMode>,
);

