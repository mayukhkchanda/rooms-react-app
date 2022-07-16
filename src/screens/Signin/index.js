import React, { useState } from "react";
import "./css/index.css";

import Form from "../Form";

import { useLocation, Link } from "react-router-dom";
import { authenticator } from "../../firebase";
import Button from "@mui/material/Button";

import history from "../../history";

const Signin = () => {
  const location = useLocation();

  const [oAuthErr, setOAuthErr] = useState(null);

  const handleSignin = (setSubmitting, email, password) => {
    authenticator
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setSubmitting(false);
        // history.push("/");
      })
      .catch((error) => {
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
          handleFormSubmit={handleSignin}
          formType="signin"
          oAuthErr={oAuthErr}
        />

        <Button variant="text">
          <Link to="signup">Create an Accout</Link>
        </Button>
      </div>
    </div>
  );
};

export default Signin;
