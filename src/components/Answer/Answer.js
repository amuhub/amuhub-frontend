import "./Answer.css";
import moment from "moment";
import { useState } from "react";
import deleteIcon from "../../assets/icons8-trash.svg";
import reportIcon from "../../assets/flag.png";
import ShareIcon from "../../assets/share.svg";
import baseUrl from "../../utils/constants";
import postToken from "../../utils/postToken";
import { Link } from "react-router-dom";

const Answer = ({
  data,
  setDeleteItemId,
  setDeleteOverlay,
  setDeleteUrl,
  user_id,
}) => {
  const token = localStorage.getItem("token");
  const [dropDown, setDropDown] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(data.upvoted);
  const [isDownvoted, setIsDownvoted] = useState(data.downvoted);
  const [upvoteCnt, setUpvoteCnt] = useState(data.upvotes.length);
  const [downvoteCnt, setDownvoteCnt] = useState(data.downvotes.length);

  const deleteAnswer = (id) => {
    setDeleteItemId(id);
    setDeleteOverlay(true);
    setDeleteUrl("answer/delete");
  };

  const upvoteAns = async () => {
    const res = await postToken(
      `${baseUrl}/answer/upvote/${data._id}`,
      {},
      token
    );
    if (isUpvoted) setIsUpvoted(false);
    else {
      setIsUpvoted(true);
      if (isDownvoted) setIsDownvoted(false);
    }
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
  };

  const downvoteAns = async () => {
    const res = await postToken(
      `${baseUrl}/answer/downvote/${data._id}`,
      {},
      token
    );
    if (isDownvoted) setIsDownvoted(false);
    else {
      setIsDownvoted(true);
      if (isUpvoted) setIsUpvoted(false);
    }
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
  };

  return (
    <div className="answer-container-outer-answer">
      <div className="ques-container">
        <div className="upvote-downvote-panel">
          <button
            className={`up ${isUpvoted ? "upvote-active" : ""}`}
            onClick={upvoteAns}
          >
            <div class="upvote-triangle"></div>
            <div className="upvote-count">{upvoteCnt}</div>
          </button>

          <button
            className={`down ${isDownvoted ? "downvote-active" : ""}`}
            onClick={downvoteAns}
          >
            <div class={`downvote-triangle`}></div>
            <div className="downvote-count">{downvoteCnt}</div>
          </button>
        </div>
        <div className="question-header">
          <div className="flex-row">
            <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
            <div className="three-dots" onClick={() => setDropDown(!dropDown)}>
              <i className="fas fa-ellipsis-h"></i>
              <div className="drop-down-wrapper">
                {dropDown && (
                  <div className="drop-down">
                    {user_id === data.user._id && (
                      <div
                        className="drop-down-item"
                        onClick={() => deleteAnswer(data._id)}
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
                      <img src={reportIcon} alt="delete" />
                      <p>Report</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <div className="author-details">
        <Link to = {`/profile/${data.user.username}`}>
          <div className="profile-div">
            <div className="profile-img">
              <img src={data.user.profile.pic} alt="profile" />
            </div>
            <p className="username">
              <span className="answered-by">Answered By</span>{" "}
              {data.user.username}
            </p>
          </div>
        </Link>
        <p className="answered-on">
          Answered{" "}
          <span>{moment(data.createdAt).fromNow()}</span>
        </p>
      </div>
    </div>
  );
};

export default Answer;
