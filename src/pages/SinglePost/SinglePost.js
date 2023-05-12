import { useState } from "react";
// import "./postOverlay.css";
import { useFetchToken } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import NoContent from "../../components/NoContent/NoContent";
import moment from "moment";
import { useEffect } from "react";
import postToken from "../../utils/postToken";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams();
  const token = localStorage.getItem("token");
  const { data, pending, error } = useFetchToken(
    `${baseUrl}/feed/post/${postId}`,
    token
  );
  console.log("post overlay", data);

  const [isLiked, setIsLiked] = useState("");
  const [comment, setComment] = useState("");
  const [likeCnt, setLikeCnt] = useState(0);

  useEffect(() => {
    if (data) {
      setIsLiked(data.data.isLiked);
      setLikeCnt(data.data.likes.length);
      console.log(isLiked);
    }
  }, [data]);

  const postComment = () => {
    const res = postToken(
      `${baseUrl}/feed/comment/${data.data._id}`,
      { text: comment },
      token
    );
    if (!res) console.log(res.error);
    setComment("");
    window.location.reload(true);
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

  return (
    <div className="single-post">
      {pending && <div className="post_overlay"></div>}
      {error && <NoContent text={"Something went wrong!"} />}
      {!pending && data && (
        <div className="post_overlay">
          <div className="post_pop_up">
            <div className="pop_up_img">
              <img src={data.data.photo} alt="" />
            </div>

            <div className="pop_up_content">
              <div className="pop_up_header">
                <div className="user_info">
                  <img
                    src={data.data.user.profile.pic}
                    className="user_img"
                    alt="user"
                  />
                  <span className="username">{data.data.user.username}</span>
                </div>
                <i className="fas fa-ellipsis-h"></i>
              </div>

              <div className="comment-section">
                {/* caption comment */}
                <div className="comment">
                  <img
                    className="commenter_img"
                    src={data.data.user.profile.pic}
                    alt="Comment User"
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

                {/* loop here */}
                {data.data.comments.map((comment) => (
                  <div className="comment">
                    <img
                      className="commenter_img"
                      src={comment.user.profile.pic}
                      alt="comment user"
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
                  </div>
                ))}
              </div>

              <div className="pop_up_stats_outer">
                <div className="pop_up_stats">
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    to="#"
                    className="post_btn"
                    onClick={postComment}
                    disabled={!comment}
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
};

export default SinglePost;
