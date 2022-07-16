import React, { useState } from "react";
import "./css/index.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const Dropdown = ({ handleSignout }) => {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="moreVerticon icon">
      <IconButton
        onClick={() => {
          setMenuState((menuState) => !menuState);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <div
        className={`icon__menu ${menuState ? "visible" : "hidden"}`}
        onClick={() => {
          handleSignout();
        }}
      >
        Signout
      </div>
    </div>
  );
};

export default Dropdown;
