import React, { useEffect, useState } from "react";
import "./css/index.scss";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { db } from "../../firebase";
import { getLastMsg } from "../../utils/sidebarUtils";

const ChatSelection = ({
  roomName,
  lastMsg,
  avatarUrl,
  isSelected,
  roomId,
  userId,
}) => {
  const [realtimeLastMsg, setRealtimeLastMsg] = useState(lastMsg);
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((doc) => {
        if (doc?.data) {
          const roomData = doc?.data();
          const { messages } = roomData || {};
          if (messages?.length > 0)
            setRealtimeLastMsg(
              getLastMsg(messages[messages?.length - 1], userId)
            );
        }
      });
    return () => unsubscribe();
  }, []);
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
        <p className="selection--right__lastMsg">{realtimeLastMsg}</p>
      </div>
    </div>
  );
};

export default ChatSelection;
