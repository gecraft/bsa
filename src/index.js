import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {AppContextProvider} from './App.context';

import './styles/style.css';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
