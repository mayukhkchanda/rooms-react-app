import React from "react";
import DonutLargeSharpIcon from "@mui/icons-material/DonutLargeSharp";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";

import ChatSelection from "../ChatSelection";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";

import { authenticator } from "../../firebase";
import { getLastMsg } from "../../utils/sidebarUtils";
import history from "../../history";
import "./css/index.scss";

const Sidebar = ({ rooms, user, selectedRoomId }) => {
  const handleSignout = () => {
    authenticator.signOut();
    history.push("/signin");
  };
  return (
    <div className="sidebar">
      <div className="section section-1">
        <div className="section-1__left">
          <div className="avatar-icon icon">
            <IconButton>
              <Avatar
                src={`https://avatars.dicebear.com/api/human/${"<user_name>"}.svg`}
              />
            </IconButton>
          </div>
          <div className="avatar--name">{user?.name}</div>
        </div>

        <div className="section-1__right">
          <div className="dounot-icon icon">
            <IconButton>
              <DonutLargeSharpIcon />
            </IconButton>
          </div>

          <div className="chat__icon icon">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </div>

          <Dropdown handleSignout={handleSignout} />
        </div>
      </div>{" "}
      {/**Avatar Section end */}
      <div className="section section-2">
        <div className="search__container">
          <div className="search__icon icon">
            <svg viewBox="0 0 512 512" width="100" title="search">
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
          </div>
          <input
            type="text"
            className="search__input"
            placeholder="Search or Start a new chat"
          />
        </div>
      </div>{" "}
      {/**Search Chat Section end */}
      <Link to="/">
        <div className="section section-3">
          <p className="addChat__title">Add or Join a Room</p>
        </div>
      </Link>
      {/**Add/Join chat Section end  */}
      <div className="section section-4">
        {rooms &&
          rooms
            .filter((room) => room.users.find((userId) => userId === user.id))
            .map((room) => {
              const { id, roomName, messages } = room || {};
              const lastMsg =
                messages?.length > 0
                  ? getLastMsg(messages?.[messages?.length - 1], user)
                  : "";
              return (
                <Link key={id} to={`${id}`}>
                  <ChatSelection
                    roomName={roomName}
                    roomId={id}
                    lastMsg={lastMsg}
                    userId={user.id}
                    avatarUrl={`https://avatars.dicebear.com/api/human/${roomName}.svg`}
                    isSelected={id === selectedRoomId}
                  />
                </Link>
              );
            })}
      </div>
      {/**Chats Section end  */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { rooms: Object.values(state.rooms), user: state.user };
};

export default connect(mapStateToProps, {})(Sidebar);
