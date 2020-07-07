import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import reducers from './reducers';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

const API = {
    URL: process.env.REACT_APP_API_URL,
    TOKEN: process.env.REACT_APP_API_TOKEN,
    KEY:process.REACT_APP_API_KEY
}

const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument(API)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
