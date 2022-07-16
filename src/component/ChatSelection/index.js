import React from "react";
import "./css/index.scss";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";

const ChatSelection = ({ roomName, lastMsg, avatarUrl, isSelected }) => {
  return (
    <div className={`chat__selection ${isSelected ? "selected" : ""}`}>
      <div className="chat__selection--left">
        <div className="avatar-icon icon">
          <IconButton>
            <Avatar src={avatarUrl} />
          </IconButton>
        </div>
      </div>

      <div className="chat__selection--right">
        <p className="selection--right__header">{roomName}</p>
        <p className="selection--right__lastMsg">{lastMsg}</p>
      </div>
    </div>
  );
};

export default ChatSelection;
