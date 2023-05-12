import React from "react";
import nocontent2 from "../../assets/no-content2.png";

const NoContent = ({ text }) => {
  return (
    <div style={{ fontSize: "16px", textAlign: "center" }}>
      <img
        src={nocontent2}
        alt="No Content Fig"
        style={{ width: "40%", margin: "20px auto" }}
      />
      <p>{text}</p>
    </div>
  );
};

export default NoContent;
