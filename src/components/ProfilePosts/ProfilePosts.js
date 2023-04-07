import React from "react";
import "./ProfilePosts.css";
import { useParams } from "react-router-dom";
import postImg from "../Post/img.png";
import { useFetch } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import ProfilePost from "./ProfilePost"

const ProfilePosts = () => {
  const { username } = useParams();
  const { data, pending, error } = useFetch(
    `${baseUrl}/profile/` + username + "/posts"
  );
  console.log("profile posts", data);

  return (
    <div className="post-grid">
      <div className="profile-post-container">
        <img src={postImg} alt="post-profile"></img>
        <div className="profile-post-overlay">
          <span className="post-likes">
            20<i className="fas fa-heart"></i>
          </span>
          <span className="post-comments">
            14<i className="fas fa-comment"></i>
          </span>
        </div>
      </div>
      <div className="profile-post-container">
        <img src={postImg} alt="post-profile"></img>
        <div className="profile-post-overlay">
          <span className="post-likes">
            20<i className="fas fa-heart"></i>
          </span>
          <span className="post-comments">
            14<i className="fas fa-comment"></i>
          </span>
        </div>
      </div>

      <div className="profile-post-container">
        <img src={postImg} alt="post-profile"></img>
        <div className="profile-post-overlay">
          <span className="post-likes">
            20<i className="fas fa-heart"></i>
          </span>
          <span className="post-comments">
            14<i className="fas fa-comment"></i>
          </span>
        </div>
      </div>

      <div className="profile-post-container">
        <img src={postImg} alt="post-profile"></img>
        <div className="profile-post-overlay">
          <span className="post-likes">
            20<i className="fas fa-heart"></i>
          </span>
          <span className="post-comments">
            14<i className="fas fa-comment"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
