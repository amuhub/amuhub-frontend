import { useState } from "react";
import { Link } from "react-router-dom";
import "./postOverlay.css";
import postImage from "./images/img.png";
import { useFetchToken } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import { Puff } from "react-loader-spinner";
import NoContent from "../../components/NoContent/NoContent";
import moment from "moment";

export default function PostOverlay({ postOverlaytoggler, postId }) {
  const token = localStorage.getItem("token");
  const { data, pending, error } = useFetchToken(`${baseUrl}/feed/post/${postId}`, token);
  console.log("post overlay", data);

  return (
    <div>
      {pending && (
        <div className="post_overlay"></div>
      )}
      {error && <NoContent text={"Something went wrong!"}/>}
      {!pending &&
        data &&
        <div className="post_overlay">
        <button className="close-btn" onClick={postOverlaytoggler}>
          <i className="fas fa-times"></i>
        </button>
        <div className="post_pop_up">
          <div className="pop_up_img">
            <img src={data.data.photo} alt="" />
          </div>

          <div className="pop_up_content">
            <div className="pop_up_header">
              <div className="user_info">
                <img src={data.data.user.profile.pic} className="user_img" alt="user" />
                <span className="username">{data.data.user.username}</span>
              </div>
              <i className="fas fa-ellipsis-h"></i>
            </div>

            <div className="comment-section">

              {/* caption comment */}
              <div className="comment">
                <img className="commenter_img" src={data.data.user.profile.pic} />
                <div className="comment_body">
                  <p>
                    <span className="commenter_username">{data.data.user.username}</span>
                    {data.data.caption}
                  </p>
                  <p>{moment(data.data.createdAt).fromNow()}</p>
                </div>
              </div>

              {/* loop here */}
              {data.data.comments.map((comment) => (
                  <div className="comment">
                    <img className="commenter_img" src={comment.user.profile.pic} />
                    <div className="comment_body">
                      <p>
                        <span className="commenter_username">{comment.user.username}</span>
                        {comment.text}
                      </p>
                      <p>{moment(comment.createdAt).fromNow()}</p>
                    </div>
                  </div>
              ))}
            </div>

            <div className="pop_up_stats_outer">
              <div className="pop_up_stats">
                <div className="pop_up_stats_likes">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                  </svg>
                  <span>{data.data.likes.length} likes</span>
                </div>
                <div className="pop_up_stats_comments">
                  <i className="far fa-comment-alt"></i>
                  <Link to="#">Comments</Link>
                </div>
              </div>
              <div className="pop_up_comment_type">
                <input type="text" placeholder="Add a comment..." />
                <Link to="#" className="post_btn">
                  Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>}  
    </div>
  );
}
