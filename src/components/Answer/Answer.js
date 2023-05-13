import "./Answer.css";
import moment from "moment";
import { useState } from "react";
import deleteIcon from "../../assets/icons8-trash.svg";
import ShareIcon from "../../assets/share.svg";
import baseUrl from "../../utils/constants";
import postToken from "../../utils/postToken";

const Answer = ({ data, setDeleteItemId, setDeleteOverlay, setDeleteUrl, user_id }) => {

  console.log("this is answer");
  console.log(data);
  const token = localStorage.getItem("token")
  const [dropDown, setDropDown] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(data.upvoted)
  const [isDownvoted, setIsDownvoted] = useState(data.downvoted)
  const [upvoteCnt, setUpvoteCnt] = useState(data.upvotes.length)
  const [downvoteCnt, setDownvoteCnt] = useState(data.downvotes.length)

  const deleteAnswer = (id) =>{
    
    setDeleteItemId(id)
    setDeleteOverlay(true);
    setDeleteUrl("answer/delete");
  }

  const upvoteAns = async () => {
    const res = await postToken(`${baseUrl}/answer/upvote/${data._id}`, {}, token)
    if(isUpvoted) setIsUpvoted(false)
    else {
      setIsUpvoted(true)
      if(isDownvoted) setIsDownvoted(false) 
    }
    setUpvoteCnt(res.data.data.upvotes.length)
    setDownvoteCnt(res.data.data.downvotes.length)
    console.log(res.data.data);
  }

  const downvoteAns = async () => {
    const res = await postToken(`${baseUrl}/answer/downvote/${data._id}`, {}, token)
    if(isDownvoted) setIsDownvoted(false)
    else {
      setIsDownvoted(true)
      if(isUpvoted) setIsUpvoted(false)
    }
    setUpvoteCnt(res.data.data.upvotes.length)
    setDownvoteCnt(res.data.data.downvotes.length)
    console.log(res.data.data);
  }

  return (
    <div className="ques-container">
      <div className="upvote-downvote-panel">
                <button className="up" onClick = {upvoteAns}>
                  {/* <svg
                    aria-hidden="true"
                    className="svg-icon iconArrowDownLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 11h32L18 27 2 11Z"></path>
                  </svg> */}
                  <div class="upvote-triangle"></div>
                  <div className="upvote-count">{upvoteCnt}</div>
                </button>
                {/* <p className="vote-count">
                  {questionData.data.upvotes.length +
                    questionData.data.downvotes.length}
                </p> */}
                <button className="down" onClick = {downvoteAns}>
                  {/* <svg
                    aria-hidden="true"
                    className="svg-icon iconArrowDownLg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                  >
                    <path d="M2 11h32L18 27 2 11Z"></path>
                  </svg> */}
                  <div class="downvote-triangle"></div>
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
                {user_id === data.user._id && 
                  <div className="drop-down-item" onClick={() => deleteAnswer(data._id)}>
                    <img src={deleteIcon} alt="delete" />
                    <p>Delete</p>
                  </div>}
                  <div className="drop-down-item">
                    <img src={ShareIcon} alt="delete" />
                    <p>Share</p>
                  </div>
                  <div className="drop-down-item">
                    <img src={deleteIcon} alt="delete" />
                    <p>Report</p>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
        
        <div className="author-details">
          <div className="profile-div">
            <div className="profile-img">
              <img src={data.user.profile.pic}></img>
            </div>
            <p className="username">
              <span className="answered-by">Answered By</span> {data.user.name}
            </p>
          </div>
          <p className="answered-on">
            Answered <span>{moment(data.createdAt).fromNow()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
