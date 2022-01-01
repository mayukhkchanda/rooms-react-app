import React from "react";
import "./css/index.css";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";

const ChatSelection = ({ roomName, lastMsg, avatarUrl }) => {
  return (
    <div className="chat__selection">
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
