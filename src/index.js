import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MainHeader from './components/Layout/MainHeader';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <MainHeader />
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
