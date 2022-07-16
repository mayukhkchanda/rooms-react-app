import Chat from "../../component/Chats";
import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";
import "./css/index.scss";

import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import Button from "../Button";
import history from "../../history";

const Rooms = ({ room }) => {
  const [isMobileView, setMobileView] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  let { roomId } = useParams();

  useEffect(() => {
    if (window && window?.innerWidth < 600) {
      setMobileView(true);
    }
  }, []);

  useEffect(() => {
    if (roomId && roomId !== "0") {
      setChatOpen(true);
    }
  }, [roomId]);

  const closeChat = () => {
    history.push("/rooms/0");
    setChatOpen(false);
  };

  const renderChats = () => {
    let renderedChat = null;

    if (roomId === "0" || !room?.id) {
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
      renderedChat = <Chat data={room} />;
    }
    return renderedChat;
  };

  const showSidebar = !isMobileView || (isMobileView && !isChatOpen);
  const showChat = !isMobileView || (isMobileView && isChatOpen);
  if (isMobileView) {
    return (
      <div className="rooms">
        {!isChatOpen && <Sidebar selectedRoomId={roomId} />}
        {isChatOpen && renderChats()}
        {isChatOpen && <Button onClick={() => closeChat()}>Close Chat</Button>}
      </div>
    );
  }
  return (
    <div className="rooms">
      <Sidebar selectedRoomId={roomId} />
      {renderChats()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { room: state.rooms[ownProps.match.params.roomId] };
};

export default connect(mapStateToProps, {})(Rooms);
