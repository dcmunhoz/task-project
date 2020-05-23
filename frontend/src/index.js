import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import App from './App';

import './index.css';

const defaultStore = store();

ReactDOM.render(
  <Provider store={defaultStore}>
    <App />
  </Provider>
  , document.getElementById('root')
);
