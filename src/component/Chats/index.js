import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./css/index.scss";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message";

import { postMessage } from "../../actions";
import { connect } from "react-redux";

import { db } from "../../firebase";

const Chats = ({ data: { id, roomName, createdBy }, user, postMessage }) => {
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc) {
          setChats(doc.data().messages);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const msg = {
      uid: user.id,
      uname: user.name,
      body: message,
      timestamp: Date(),
    };

    postMessage(id, msg);

    setMessage("");
  };

  const renderChats = () => {
    if (!chats || chats === []) return false;

    return chats.map(({ body, timestamp, uid, uname }) => (
      <Message
        key={timestamp}
        body={body}
        timestamp={timestamp}
        uid={uid}
        from={uname}
        isSender={uid === user.id}
      />
    ));
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
          <h3 className="chats__room__name">{roomName}</h3>
          <p className="chats__last_seen">
            Created by {createdBy || "anonymous"}
          </p>
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
      <div className="chats__body">{renderChats()}</div>
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

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = { postMessage };

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
