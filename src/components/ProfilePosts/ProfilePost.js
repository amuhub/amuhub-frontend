import React, { useState } from "react";
import "./ProfilePosts.css";
import postImg from "../Post/img.png";
import PostOverlay from "../../pages/Post_Overlay/PostOverlay";

const ProfilePost = (props) => {
  const { postItem, defaultToggleOverlay } = props;
  const [togglePostOverlay, setTogglePostOverlay] =
    useState(defaultToggleOverlay);

  const postOverlaytoggler = () => {
    togglePostOverlay === true
      ? setTogglePostOverlay(false)
      : setTogglePostOverlay(true);
  };
  return (
    <div className="profile-post-container">
      <div onClick={postOverlaytoggler}>
        <img src={postItem.photo} alt="post-profile"></img>
        <div className="profile-post-overlay">
          <span className="post-likes">
            {postItem.likes.length}
            <i className="fas fa-heart"></i>
          </span>
          <span className="post-comments">
            {postItem.comments.length}
            <i className="fas fa-comment"></i>
          </span>
        </div>
      </div>
      {togglePostOverlay && (
        <PostOverlay
          postId={postItem._id}
          postOverlaytoggler={postOverlaytoggler}
        />
      )}
    </div>
  );
};

export default ProfilePost;
