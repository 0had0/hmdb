import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router } from 'react-router-dom';

import { Configuration, NestedDialogContextProvider } from 'react-md';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { SkeletonTheme } from 'react-loading-skeleton';

import reducers from './reducers';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const configWithKey = config;

    if (config.url.includes('?')) {
      configWithKey.url = `${config.url}&api_key=${process.env.REACT_APP_API_KEY}`;
    } else {
      configWithKey.url = `${config.url}?api_key=${process.env.REACT_APP_API_KEY}`;
    }

    return configWithKey;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Configuration>
          <NestedDialogContextProvider>
            <SkeletonTheme color="#616161" highlightColor="#424242">
              <App />
            </SkeletonTheme>
          </NestedDialogContextProvider>
        </Configuration>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
