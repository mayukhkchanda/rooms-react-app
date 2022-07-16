import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Field from "../Feild";
import "./css/index.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, handleConfirm }) {
  const [Value, setValue] = useState("");

  const handleConfirmClick = () => {
    if (Value && Value?.trim()) {
      handleConfirm(Value);
    }
    setValue("");
  };

  return (
    <div className="Modal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        classes={{
          root: "modal-root",
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Room Name
          </Typography>
          <Field Value={Value} setValue={setValue} />
          <Button onClick={handleConfirmClick} disabled={Value?.length < 2}>
            Create Room
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
