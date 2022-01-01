import Chat from "../../component/Chats";
import React from "react";
import Sidebar from "../../component/Sidebar";
import "./css/index.css";

import { useParams } from "react-router-dom";

const Rooms = () => {
  let { roomId } = useParams();

  const renderChats = () => {
    let renderedChat = null;

    if (roomId === "0") {
      renderedChat = (
        <div className="chats">
          <div className="chats__body default">
            <h1 className="body__defaultMsg">
              Select or Create a room to start Chatting
            </h1>
          </div>
        </div>
      );
    } else {
      renderedChat = <Chat roomId={roomId} />;
    }
    return renderedChat;
  };

  return (
    <div className="rooms">
      <Sidebar />
      {renderChats()}
    </div>
  );
};

export default Rooms;
