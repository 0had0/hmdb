import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import { Configuration, NestedDialogContextProvider } from 'react-md';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { SkeletonTheme } from 'react-loading-skeleton';

import reducers from './reducers';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

const API = {
  URL: process.env.REACT_APP_API_URL,
  TOKEN: process.env.REACT_APP_API_TOKEN,
  KEY: process.env.REACT_APP_API_KEY,
};

const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(API)),
);

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
