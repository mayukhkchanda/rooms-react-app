import React, { useState } from "react";
import "./css/index.scss";

import { authenticator } from "../../firebase";
import Form from "../Form";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

import history from "../../history";
import { connect } from "react-redux";
import { signIn, addUserData } from "../../actions";

const Signup = ({ signIn }) => {
  const [oAuthErr, setOAuthErr] = useState(null);

  const handleSignup = (setSubmitting, email, password, username) => {
    authenticator
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const photoURL = `https://avatars.dicebear.com/api/human/${username}.svg`;
          const userData = {
            id: user?.uid,
            name: username,
            email: user?.email,
            photoURL: photoURL,
          };
          user
            .updateProfile({
              displayName: username,
              photoURL,
            })
            .then(() => {
              signIn(userData);
              addUserData(userData);
              history.push("/");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setOAuthErr(error.message);
      });

    setSubmitting(false);
  };

  return (
    <div className="signin">
      <div className="signin__main">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/app-logo.png`}
          alt="rooms-app-logo"
          className="main__logo"
        />
        <h2 className="main__text">Rooms</h2>
        <p className="secondary__text">
          Finding people like you... Just got Easy!
        </p>

        <Form
          handleFormSubmit={handleSignup}
          formType="signup"
          oAuthErr={oAuthErr}
        />
        <Button className="text-transform-none" variant="text">
          <Link to="signin">Have an account?</Link>
          <LoginIcon className="ml-8" />
        </Button>
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  signIn: (payload) => dispatch(signIn(payload)),
}))(Signup);
