import React from "react";
import "./ProfilePosts.css";
import postImg from "../Post/img.png";

const ProfilePost = (props) => {
  const { postItem } = props;
  return (
    <div className="profile-post-container">
      <img src={postItem.photo} alt="post-profile"></img>
      <div className="profile-post-overlay">
        <span className="post-likes">
          {postItem.likes.length}<i className="fas fa-heart"></i>
        </span>
        <span className="post-comments">
        {postItem.comments.length}<i className="fas fa-comment"></i>
        </span>
      </div>
    </div>
  );
};

export default ProfilePost;
