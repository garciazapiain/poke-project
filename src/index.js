import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as JotaiProvider, useAtom } from 'jotai';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </React.StrictMode>
);

