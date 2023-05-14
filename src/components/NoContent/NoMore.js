import React from "react";
import nomore from "../../assets/no-more.png";
import "./NoMore.css"; // Import the CSS file for styling and animation

const NoMore = ({ text }) => {
  return (
    <div className="no-more-container">
      <img src={nomore} alt="No Content Fig" className="no-more-image" />
    </div>
  );
};

export default NoMore;
