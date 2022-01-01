import React from "react";
import "./css/index.css";

const Room = ({ roomName, createdBy }) => {
  return (
    <div className="main__room">
      <div className="room__photo">
        <img
          src={`https://avatars.dicebear.com/api/human/${roomName}.svg`}
          alt={`${roomName} avatar `}
        />
      </div>
      <div className="room__desc">
        <div className="room__name">{roomName} Room</div>
        <div className="room__owner">Created by {createdBy}</div>
      </div>
    </div>
  );
};

export default Room;
