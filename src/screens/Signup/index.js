import React, { useState } from "react";
import "./css/index.css";

import { authenticator } from "../../firebase";
import Form from "../Form";

import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

import history from "../../history";
import { connect } from "react-redux";
import { signIn } from "../../actions";

const Signup = ({ signIn }) => {
  const [oAuthErr, setOAuthErr] = useState(null);

  const handleSignup = (setSubmitting, email, password, username) => {
    authenticator
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const photoURL = `https://avatars.dicebear.com/api/human/${username}.svg`;
          user
            .updateProfile({
              displayName: username,
              photoURL,
            })
            .then(() => {
              signIn({
                id: user?.uid,
                name: username,
                email: user?.email,
                photoURL: photoURL,
              });
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
          src="https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-4096.png"
          alt="whatsapp-clone-logo"
          className="main__logo"
        />
        <h2 className="main__text">Rooms Clone</h2>

        <Form
          handleFormSubmit={handleSignup}
          formType="signup"
          oAuthErr={oAuthErr}
        />
        <Button variant="text">
          <Link to="signin">Have an account?</Link>
        </Button>
      </div>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  signIn: (payload) => dispatch(signIn(payload)),
}))(Signup);
