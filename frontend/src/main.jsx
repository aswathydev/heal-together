
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // This imports App from your App.jsx file
import './index.css';

// 1. Import the Provider and your configured store
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);