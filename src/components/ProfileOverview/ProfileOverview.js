import React from "react";
import "./ProfileOverview.css";

const ProfileOverview = () => {
  return (
    <div className="profile-overview">
      <div className="profile-div">
        <div className="profile-img"></div>
        <p className="profile-overview-info">
          name <span>@username</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileOverview;
