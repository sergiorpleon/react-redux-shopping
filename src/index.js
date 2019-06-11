import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from './reducers'

import App from './components/App';


const createStoreWitchMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWitchMiddleware(reducers, composeWithDevTools())}>
    <App />
  </Provider>
  ,
  document.querySelector('#root')
);
//registerServiceWorker();
