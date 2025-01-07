import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from 'routes';
import { VideosProvider } from 'context/VideosContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VideosProvider>
    <AppRoutes/>
    </VideosProvider>
  </React.StrictMode>
);

