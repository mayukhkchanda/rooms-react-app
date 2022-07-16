import React from "react";
import { render as rtlRender, unmountComponentAtNode } from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { screen } from "@testing-library/react";

const render = (component, node) =>
  rtlRender(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      {component}
    </Provider>,
    node
  );

it("Renders without crashing", () => {
  const Div = document.createElement("div");
  render(<App />, Div);

  unmountComponentAtNode(Div);
});

it("Screen contains text", () => {
  const Div = document.createElement("div");
  render(<App />, Div);

  screen.debug();

  unmountComponentAtNode(Div);
});
