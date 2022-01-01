import React, { useState } from "react";
import "./css/index.css";

const Index = ({ Value, setValue }) => {
  return (
    <div className="feild">
      <input
        className="feild__input"
        type="text"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Index;
