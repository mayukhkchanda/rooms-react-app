import React from "react";
import "./css/index.scss";

const Button = ({ type, disabled, innerText, children, ...rest }) => {
  return (
    <button className="Feild__button" type={type} disabled={disabled} {...rest}>
      {innerText || children}
    </button>
  );
};

export default Button;
