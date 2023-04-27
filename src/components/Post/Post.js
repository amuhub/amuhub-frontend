import { React, useState } from "react";
import "./Post.css";
import PostOverlay from "../../pages/Post_Overlay/PostOverlay";
import { Link } from "react-router-dom";
import postToken from "../../utils/postToken";
import baseUrl from "../../utils/constants";


const Post = (props) => {
  const { data } = props;
  const token = localStorage.getItem("token")
  const [togglePostOverlay, setTogglePostOverlay] = useState(false);
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const postOverlaytoggler = () => {
    togglePostOverlay === true
      ? setTogglePostOverlay(false)
      : setTogglePostOverlay(true);
  };

  const postComment = ()=>{
    const res = postToken(
      `${baseUrl}/feed/comment/${data._id}`,
     {text:comment}, 
      token
      ) 
    if(!res) console.log(res.error);
    setComment("")
  }

  const doLike = (e)=>{
    setIsLiked(!isLiked)
    e.currentTarget.classList.toggle('liked')
  }

  const doubleLiked = (e)=>{
    e.currentTarget.classList.add('liked-double')
  }

  return (
    <>
      <div className="post_container">
        <div className="post_header">
          <div className="user_info">
            <img src={data.photo} className="user_img" alt="" />
            <span className="username">{data.user.username}</span>
          </div>
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="post_content">
          <div className="post" onDoubleClick={doubleLiked}>
            <img src={data.photo} alt="" />
            <div className="post-heart"></div>
          </div>
          <div className="post_stats">
            <div className='post_stats_likes' onClick={doLike}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                
              >
                <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
              </svg>
              <span>{data.likes.length}</span>
            </div>
            <div className="post_stats_comments">
              <i className="far fa-comment-alt"></i>
              <Link to = "" onClick={postOverlaytoggler}>Comments</Link>
            </div>
          </div>
        </div>
        <div className="post_comment">
          <input 
          type="text" 
          placeholder="Add a comment..." 
          value={comment}
          onChange = {(e)=>(setComment(e.target.value))}
          />
          <Link to = "" className="post_btn" onClick={postComment}>Post</Link>
        </div>
      </div>

      {togglePostOverlay && (
        <PostOverlay postOverlaytoggler={postOverlaytoggler} postId = {data._id}/>
      )}
    </>
  );
};

export default Post;
