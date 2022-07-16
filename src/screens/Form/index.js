import React from "react";
import { Formik } from "formik";
import Field from "../Field";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./css/index.scss";

const Form = ({ handleFormSubmit, formType, oAuthErr }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password || values.password.trim() === "") {
          errors.password = "Password is required";
        } else if (values.password.length < 6 || values.password.length > 50) {
          errors.password = "Password must be between 6-50 characters";
        }

        // return early for sign-in form
        if (formType === "signin") return errors;

        if (!values.username || values.username.trim() === "") {
          errors.username = "Username is required";
        } else if (values.username.length < 6 || values.username.length > 50) {
          errors.username = "Username must be between 6-50 characters";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const email = values.email;
        const pwd = values.password;
        const username = values.username;

        values.email = "";
        values.password = "";
        values.username = "";
        handleFormSubmit(setSubmitting, email, pwd, username);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="form">
          <p className="header">
            {formType === "signin"
              ? "Good to have you back!"
              : "Tell us about yourself!"}
          </p>
          {formType === "signup" && (
            <Field
              type="text"
              name="username"
              placeholder="Username"
              handleChange={handleChange}
              handleBlur={handleBlur}
              val={values.username}
              touched={touched.username}
              error={errors.username}
            />
          )}

          <Field
            type="email"
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            val={values.email}
            touched={touched.email}
            error={errors.email}
          />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            val={values.password}
            touched={touched.password}
            error={errors.password}
          />

          {((formType === "signup" && !values.username) ||
            (formType !== "signup" && !values.email)) &&
            oAuthErr && <div className="oauth--error">{oAuthErr}</div>}

          <LoadingButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="contained"
            endIcon={
              formType === "signin" ? <LoginIcon /> : <AccountCircleIcon />
            }
            className="submit-btn"
          >
            {formType === "signin" ? "Sign In" : "Sign Up"}
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};

export default Form;
