import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./css/index.css";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message";

const Chats = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(message);

    setMessage("");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <div className="chats__header--left">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${"<user_name>"}.svg`}
          />
        </div>
        <div className="chats__header--middle">
          <h3 className="chats__room__name">Room Name</h3>
          <p className="chats__last_seen">Last seen at ...</p>
        </div>
        <div className="chats__header--right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chats__body">
        {/* TODO:: Render Rooms messages here */}
        <Message />
        <Message isSender />
      </div>
      <div className="chats__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit"></button>
        </form>
        <IconButton onClick={handleFormSubmit}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chats;
