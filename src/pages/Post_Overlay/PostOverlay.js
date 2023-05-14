import { useState } from "react";
import { Link } from "react-router-dom";
import "./postOverlay.css";
import postImage from "./images/img.png";
import { useFetchToken } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import { Puff } from "react-loader-spinner";
import NoContent from "../../components/NoContent/NoContent";
import moment from "moment";
import { useEffect } from "react";
import postToken from "../../utils/postToken";
import deleteIcon from "../../assets/icons8-trash.svg";
import DeleteAlert from "../../components/DeleteAlert/DeleteAlert";
import isAuthenticated from "../../utils/isAuth";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import ShareIcon from "../../assets/share.svg";

export default function PostOverlay({ postOverlaytoggler, postId }) {
  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/feed/post/${postId}`,
    token
  );
  if (!pending) console.log(data);

  const [isLiked, setIsLiked] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [likeCnt, setLikeCnt] = useState(0);
  const [commentToggler, setCommentToggler] = useState(true);
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsPending, setCommentsPending] = useState(true);
  const [commentPosted, setCommentPosted] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState("");

  useEffect(() => {
    if (data) {
      setIsLiked(data.data.isLiked);
      setLikeCnt(data.data.likes.length);
    }
  }, [data]);

  const deleteComment = (id) => {
    setDeleteItemId(id);
    setDeleteUrl("feed/comment");
    setDeleteOverlay(true);
  };

  const deletePost = (id) => {
    setDeleteItemId(id);
    setDeleteOverlay(true);
    setDeleteUrl("feed/delete");
  };

  useEffect(() => {
    let fetchedComments = []; // Variable to store fetched comments

    axios
      .get(`${baseUrl}/feed/post/${postId}/comments`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((res) => {
        fetchedComments = res.data.data;
        setComments(fetchedComments); // Update the comments state
        setCommentsPending(false);
        setCommentPosted(false);
        console.log("Comments   " + fetchedComments); // Log the fetched comments
      });
  }, [deleteOverlay, commentPosted]);

  const postComment = () => {
    const res = postToken(
      `${baseUrl}/feed/comment/${data.data._id}`,
      { text: commentInput },
      token
    );
    if (!res) console.log(res.error);
    setCommentInput("");
    setCommentPosted(true);
  };

  const doLike = async (e) => {
    const res = await postToken(
      `${baseUrl}/feed/togglelike/${data.data._id}`,
      {},
      token
    );
    if (res.status === 200) {
      if (res.data.message === "Post liked") {
        setIsLiked(true);
      } else setIsLiked(false);
      setLikeCnt(res.data.data.likes.length);
    }
  };

  const toggleCommentSection = () => {
    setCommentToggler(!commentToggler);
  };

  return (
    <div>
      {pending && <div className="post_overlay"></div>}
      {deleteOverlay && (
        <DeleteAlert
          overlayToggle={setDeleteOverlay}
          deleteURL={deleteUrl}
          deleteItemId={deleteItemId}
        />
      )}
      {error && <NoContent text={"Something went wrong!"} />}
      {!pending && data && (
        <div className="post_overlay">
          <button className="close-btn" onClick={postOverlaytoggler}>
            <i className="fas fa-times"></i>
          </button>
          <div className="post_pop_up">
            <div className="pop-up-img-outer">
              <div className="pop_up_header desktop-popup-hide">
                <div className="user_info">
                  <img
                    src={data.data.user.profile.pic}
                    className="user_img"
                    alt="user"
                  />
                  <span className="username">{data.data.user.username}</span>
                </div>
                <div
                  className="three-dots"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <i className="fas fa-ellipsis-h"></i>
                  <div className="drop-down-wrapper">
                    {dropDown && (
                      <div className="drop-down">
                        {isAuthenticated() === data.data.user.username && (
                          <div
                            className="drop-down-item"
                            onClick={() => deletePost(data.data._id)}
                          >
                            <img src={deleteIcon} alt="delete" />
                            <p>Delete</p>
                          </div>
                        )}
                        <div className="drop-down-item">
                          <img src={ShareIcon} alt="delete" />
                          <p>Share</p>
                        </div>
                        <div className="drop-down-item">
                          <img src={deleteIcon} alt="delete" />
                          <p>Report</p>
                        </div>
                        <div className="drop-down-triangle"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pop_up_img">
                <img src={data.data.photo} alt="" />
              </div>
            </div>
            <div
              className={`pop_up_content ${
                commentToggler ? "inactive-comment" : ""
              }`}
            >
              <div className="pop_up_header">
                <div className="user_info">
                  <img
                    src={data.data.user.profile.pic}
                    className="user_img"
                    alt="user"
                  />
                  <span className="username">{data.data.user.username}</span>
                </div>
                <div
                  className="three-dots"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <i className="fas fa-ellipsis-h"></i>
                  <div className="drop-down-wrapper">
                    {dropDown && (
                      <div className="drop-down">
                        {isAuthenticated() === data.data.user.username && (
                          <div
                            className="drop-down-item"
                            onClick={() => deletePost(data.data._id)}
                          >
                            <img src={deleteIcon} alt="delete" />
                            <p>Delete</p>
                          </div>
                        )}
                        <div className="drop-down-item">
                          <img src={ShareIcon} alt="delete" />
                          <p>Share</p>
                        </div>
                        <div className="drop-down-item">
                          <img src={deleteIcon} alt="delete" />
                          <p>Report</p>
                        </div>
                        <div className="drop-down-triangle"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="mobile_pop_up_header"
                onClick={toggleCommentSection}
              >
                <div className="comment-toggle"></div>
                <p>Comments</p>
              </div>

              <div className="comment-section">
                <div className="comment">
                  <img
                    className="commenter_img"
                    src={data.data.user.profile.pic}
                    alt="user"
                  />
                  <div className="comment_body">
                    <p>
                      <span className="commenter_username">
                        {data.data.user.username}
                      </span>
                      {data.data.caption}
                    </p>
                    <p>{moment(data.data.createdAt).fromNow()}</p>
                  </div>
                </div>

                {commentsPending && (
                  <InfinitySpin width="300" color="#6495ED" />
                )}
                {comments.map((comment) => (
                  <div className="comment">
                    <img
                      className="commenter_img"
                      src={comment.user.profile.pic}
                      alt="user"
                    />
                    <div className="comment_body">
                      <p>
                        <span className="commenter_username">
                          {comment.user.username}
                        </span>
                        {comment.text}
                      </p>
                      <p>{moment(comment.createdAt).fromNow()}</p>
                    </div>
                    {isAuthenticated() === comment.user.username && (
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className="delete-icon"
                        onClick={() => deleteComment(comment._id)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pop_up_stats_outer">
                <div className="pop_up_stats desktop-pop-up-stats">
                  <div
                    className={`post_stats_likes ${isLiked ? "liked" : ""}`}
                    onClick={doLike}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                    </svg>
                    <span>{likeCnt}</span>
                  </div>
                </div>
                <div className="pop_up_comment_type">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button
                    to="#"
                    className="post_btn"
                    onClick={postComment}
                    disabled={!commentInput}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
