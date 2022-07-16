import React from "react";
import { render as rtlRender, unmountComponentAtNode } from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../../reducers";

import { screen } from "@testing-library/react";

import { getRooms, addRoom } from "../../../actions";

import Home from "../index";

const render = (component, node) =>
  rtlRender(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
      {component}
    </Provider>,
    node
  );

describe("Home", () => {
  test("renders Home component", () => {
    const Div = document.createElement("div");
    render(<Home getRooms={getRooms} addRoom={addRoom} />, Div);

    unmountComponentAtNode(Div);
  });
});
