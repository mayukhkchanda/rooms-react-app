import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Room from "../Room";
import "./css/index.css";

import Modal from "../../component/Modal";

import { connect } from "react-redux";
import { getRooms, addRoom } from "../../actions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = ({ rooms = [], getRooms, addRoom, user }) => {
  useEffect(() => {
    // getRooms();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (roomName) => {
    // console.log(roomName);
    addRoom(roomName);
    handleClose();
  };

  const renderRooms = () => {
    let renderedRoomsList = null;

    if (rooms.length) {
      renderedRoomsList = rooms
        .filter((room) => !room.users.find((userId) => userId === user.id))
        .map(({ id, createdBy, roomName }) => {
          return (
            <Link key={id} to={`/rooms/${id}`}>
              <Room roomName={roomName} createdBy={createdBy} />
            </Link>
          );
        });
    }

    return renderedRoomsList;
  };

  return (
    <div className="home">
      <h1 className="home__header">Welcome to Rooms App</h1>
      <div className="home__main">
        <h2 className="main__header">Join a Room</h2>
        <div className="main__rooms">{renderRooms()}</div>
        {/**main room end */}
      </div>
      {/**main content end */}

      <h2 className="home__footer">
        <div className="footer__link footer__link--1" onClick={handleOpen}>
          <span className="footer__text">Create a Room</span>
          <span className="footer__icon">
            <AddBoxIcon />
          </span>
        </div>
        <Link to="/rooms/0">
          <div className="footer__link footer__link--2">
            <span className="footer__text">Start Chatting</span>
            <span className="footer__icon">
              <ArrowForwardIcon />
            </span>
          </div>
        </Link>
      </h2>

      <div className="home__modal">
        <Modal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        ></Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { rooms: Object.values(state.rooms), user: state.user };
};

export default connect(mapStateToProps, {
  getRooms,
  addRoom,
})(Home);
