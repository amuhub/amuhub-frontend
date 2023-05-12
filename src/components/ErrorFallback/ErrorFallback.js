import React from "react";
import servererror from "../../assets/servererror.png";

const ErrorFallback = ({ error }) => {
  return (
    <div>
      <img
        src={servererror}
        alt="No Content Fig"
        style={{ width: "40%", margin: "20px auto" }}
      />
    </div>
  );
};

export default ErrorFallback;
