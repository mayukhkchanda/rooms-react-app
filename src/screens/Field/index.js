import React from "react";
import "./css/index.css";

const Field = ({
  type,
  name,
  placeholder,
  handleChange,
  handleBlur,
  val,
  touched,
  error,
}) => {
  return (
    <div className="Feild">
      <input
        className={`Feild__input ${error && touched ? "error" : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={val}
      />
      {error && touched && error && <p className="Feild__error">{error}</p>}
    </div>
  );
};

export default Field;
