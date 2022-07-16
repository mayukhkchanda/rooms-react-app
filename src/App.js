import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import history from "./history";
import Rooms from "./screens/Rooms";

import { connect } from "react-redux";
import { signIn, signOut, getRooms } from "./actions";

import { authenticator } from "./firebase";

const App = ({ signIn, signOut, getRooms, userDetails }) => {
  useEffect(() => {
    if (userDetails?.id) {
      history.push("/");
    } else {
      history.push("/signin");
    }
  }, [userDetails?.id]);

  useEffect(() => {
    authenticator.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

        if (!userDetails?.id) {
          signIn({ id: uid, name: displayName, email, photoURL });
        }
        getRooms();
      } else {
        signOut();
      }
    });
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/rooms/:roomId" component={Rooms} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state?.user,
});

export default connect(mapStateToProps, {
  signIn,
  signOut,
  getRooms,
})(App);
