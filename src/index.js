import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <JotaiProvider>
        <App />
      </JotaiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

