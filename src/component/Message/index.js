import React from "react";
import "./css/index.css";

const Message = ({ isSender, body, timestamp, uid, from }) => {
  const time = new Date(timestamp);
  const day = time.getDate();
  const month = timestamp.split(" ")[1];

  const [hour, minutes] = [time.getHours(), time.getMinutes()];

  return (
    <div className={`chat__message ${isSender ? "chat__message--sender" : ""}`}>
      <span className="message__sender">{from}</span>
      <div className="message__body">
        <p className="message__content">{body}</p>
        <p className="message__timestamp">{`${day} ${month} ${hour}:${minutes} `}</p>
      </div>
    </div>
  );
};

export default Message;
