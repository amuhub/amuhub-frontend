import React from "react";
import "../ProfileOverview/ProfileOverview.css";
import { Link } from "react-router-dom";

const ProfileCard = ({ data, setSocialToggler }) => {
  return (
    <Link
      to={`/profile/${data.username}`}
      onClick={() => setSocialToggler(false)}
      style={{ display: "block", width: "100%" }}
    >
      <div className="profile-overview">
        <div className="profile-div">
          <div className="profile-img">
            <img src={data.profile.pic}></img>
          </div>
          <p className="profile-overview-info">
            {data.name} <span>@{data.username}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
