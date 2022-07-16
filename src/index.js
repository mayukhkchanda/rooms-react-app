import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { Router } from "react-router-dom";
import history from "./history";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))}
  >
    <Router history={history}>
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);
