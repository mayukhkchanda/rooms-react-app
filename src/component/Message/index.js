import React from "react";
import "./css/index.css";

const Message = ({ isSender }) => {
  return (
    <div className={`chat__message ${isSender ? "chat__message--sender" : ""}`}>
      <span className="message__sender">Dev Mayukh</span>
      <div className="message__body">
        <p className="message__content">Hi, I am a Software Developer</p>
        <p className="message__timestamp">4:30 PM</p>
      </div>
    </div>
  );
};

export default Message;
