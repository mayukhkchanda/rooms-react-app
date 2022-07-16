import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Room from "../Room";
import "./css/index.scss";

import Modal from "../../component/Modal";

import { connect } from "react-redux";
import { getRooms, addRoom, addUserToRoom } from "../../actions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid } from "@mui/material";
import Button from "../Button";
import { authenticator } from "../../firebase";
import history from "../../history";

const Home = ({ rooms = [], addRoom, addUserToRoom, user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (roomName) => {
    addRoom(roomName);
    handleClose();
  };

  const renderRooms = () => {
    const roomsToRender = rooms.filter(
      (room) => !room.users.find((userId) => userId === user.id)
    );

    if (roomsToRender.length) {
      return (
        <>
          <h2 className="main__header">Join a Room</h2>
          <div className="main__rooms">
            {roomsToRender.map(({ id, createdBy, roomName }) => {
              return (
                <Link
                  key={id}
                  to={`/rooms/${id}`}
                  onClick={() => {
                    addUserToRoom(id);
                  }}
                >
                  <Room roomName={roomName} createdBy={createdBy} />
                </Link>
              );
            })}
          </div>
        </>
      );
    }

    return (
      <>
        <h2 className="main__header">All caught up! Start Chatting.</h2>
      </>
    );
  };

  if (!user?.id) {
    return <Redirect to="signin" />;
  }

  const handleSignout = () => {
    authenticator.signOut();
    history.push("/signin");
  };

  return (
    <div className="home">
      <Grid container className="header-container" alignItems="center">
        <Grid item xs={11}>
          <h2 className="home__header">{`Hi ${user?.name}! Welcome back.`}</h2>
        </Grid>
        <Grid item xs={1} onClick={() => handleSignout()}>
          <Button innerText="Logout" type="button" />
        </Grid>
      </Grid>
      <div className="home__main">
        {renderRooms()}
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
        />
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
  addUserToRoom,
})(Home);
