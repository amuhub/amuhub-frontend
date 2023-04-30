import React from "react";
import "./ProfileOverview.css";
import { Link } from "react-router-dom";

const ProfileOverview = ({
  name,
  username,
  setSearchResultsDisplay,
  setQuery,
}) => {
  const changeHandler = () => {
    setSearchResultsDisplay(false);
    setQuery("");
  };
  return (
    <Link
      to={`/profile/${username}`}
      onClick={changeHandler}
      style={{ display: "block", width: "100%" }}
    >
      <div className="profile-overview">
        <div className="profile-div">
          <div className="profile-img"></div>
          <p className="profile-overview-info">
            {name} <span>@{username}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileOverview;
