import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from 'redux';
import allReducersAdmin from './reducers/admin/index.reducers';
import { Provider } from "react-redux";

const allReducers = combineReducers({
  admin: allReducersAdmin,
});

const store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
