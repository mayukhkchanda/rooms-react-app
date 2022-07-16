import React, { useState } from "react";
// import "./css/index.scss";

import Form from "../Form";

import { Link } from "react-router-dom";
import { authenticator } from "../../firebase";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Signin = () => {
  const [oAuthErr, setOAuthErr] = useState(null);

  const handleSignin = (setSubmitting, email, password) => {
    authenticator
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSubmitting(false);
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
          src={`${process.env.PUBLIC_URL}/assets/images/app-logo.png`}
          alt="rooms-app-logo"
          className="main__logo"
        />
        <h2 className="main__text">Rooms</h2>
        <p className="secondary__text">
          Finding people like you... Just got Easy!
        </p>

        <Form
          handleFormSubmit={handleSignin}
          formType="signin"
          oAuthErr={oAuthErr}
        />
        <Button className="text-transform-none" variant="text">
          <Link to="signup">Create an Accout</Link>
          <AccountCircleIcon className="ml-8" />
        </Button>
      </div>
    </div>
  );
};

export default Signin;
