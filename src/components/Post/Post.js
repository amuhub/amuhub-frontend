import { React, useEffect, useState } from "react";
import "./Post.css";
import PostOverlay from "../../pages/Post_Overlay/PostOverlay";
import { Link } from "react-router-dom";
import postToken from "../../utils/postToken";
import baseUrl from "../../utils/constants";
import deleteIcon from "../../assets/icons8-trash.svg"
import DeleteAlert from "../DeleteAlert/DeleteAlert";
import axios from "axios";
import isAuthenticated from "../../utils/isAuth";
import ShareIcon from '../../assets/share.svg'


const Post = (props) => {
  const { data, defaultToggleOverlay} = props;
  const token = localStorage.getItem("token");
  const [togglePostOverlay, setTogglePostOverlay] = useState(defaultToggleOverlay);
  const [isLiked, setIsLiked] = useState("");
  const [comment, setComment] = useState("");
  const [likeCnt, setLikeCnt] = useState(0);
  const [dropDown, setDropDown] = useState(true)
  const [deleteOverlay, setDeleteOverlay] = useState(false)

  useEffect(() => {
    if (data) {
      setIsLiked(data.isLiked);
      setLikeCnt(data.likes.length);
    }
  }, [data]);

  

  const postOverlaytoggler = () => {
    togglePostOverlay === true
      ? setTogglePostOverlay(false)
      : setTogglePostOverlay(true);
  };

  const postComment = () => {
    const res = postToken(
      `${baseUrl}/feed/comment/${data._id}`,
      { text: comment },
      token
    );
    if (!res) console.log(res.error);
    setComment("");
    setTogglePostOverlay(true);
  };

  const doLike = async (e) => {
    const res = await postToken(
      `${baseUrl}/feed/togglelike/${data._id}`,
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

  // const deletePost = async () =>{
  //   const res = await axios.delete(`${baseUrl}/feed/delete/${data._id}`, {
  //     headers : {
  //       "content-type" : "application/json",
  //       "x-auth-token" : token,
  //     }
  //   })
  //   window.location.reload(false);
  //   console.log(res);
  // }

  // const doubleLiked = (e)=>{
  //   e.currentTarget.classList.add('liked-double')
  // }

  return (
    <>
    {deleteOverlay && 
    <DeleteAlert text = "Are you sure you want to delete this post?"
    overlayToggle={setDeleteOverlay}
    deleteURL = ""/>}
      <div className="post_container">
        <div className="post_header">
          <div className="user_info">
            <img src={data.photo} className="user_img" alt="" />
            <span className="username">{data.user.username}</span>
          </div>

          <div className="three-dots" onClick={()=> setDropDown(!dropDown)}>
            <i className="fas fa-ellipsis-h"></i>
            <div className="drop-down-wrapper">
              {dropDown && 
              <div className="drop-down">
                <div className="drop-down-item">
                  <img src = {ShareIcon} alt = "delete"/>
                  <p>Share</p>
                </div>
                <div className="drop-down-item">
                  <img src = {deleteIcon} alt = "delete"/>
                  <p>Report</p>
                </div>
                <div className="drop-down-triangle"></div>
              </div>
                
              }
            </div>
            
          </div>
          
        </div>
        <div className="post_content">
          <div className="post">
            <img src={data.photo} alt="" />
            <div className="post-heart"></div>
          </div>
          <div className="post_stats">
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
            <div className="post_stats_comments">
              <i className="far fa-comment-alt"></i>
              <Link to="" onClick={postOverlaytoggler}>
                Comments
              </Link>
            </div>
          </div>
        </div>
        <div className="post_comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_btn"
            onClick={postComment}
            disabled={!comment}
          >
            Post
          </button>
        </div>
      </div>

      {togglePostOverlay && (
        <PostOverlay
          postOverlaytoggler={postOverlaytoggler}
          postId={data._id}
        />
      )}
    </>
  );
};

export default Post;
