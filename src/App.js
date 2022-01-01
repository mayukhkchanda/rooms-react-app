import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
// import Rooms from "./screens/Rooms";
import Signin from "./screens/Signin";
import { Link } from "react-router-dom";
import history from "./history";
import Rooms from "./screens/Rooms";

import { connect } from "react-redux";
import { signIn, signOut, fetchUserRooms, getRooms } from "./actions";

// TODO: Update to get the logged in user
const user = { name: "test_user", id: "UtZq6Hb80DRYEBqZm4HD" };

const App = ({ signIn, signOut, fetchUserRooms, getRooms }) => {
  //TODO: Initialise user object here
  useEffect(() => {
    if (user) {
      signIn(user);
      // fetchUserRooms(user);
      getRooms();
    } else {
      signOut();
    }

    // return () => { }
  }, []);

  return (
    <Router history={history}>
      <div className="app">
        <div className="app__body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/rooms/:roomId" component={Rooms} />
          </Switch>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/rooms/23123">Rooms</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
};

export default connect(null, {
  signIn,
  signOut,
  fetchUserRooms,
  getRooms,
})(App);
