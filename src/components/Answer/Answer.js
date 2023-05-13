import "./Answer.css";
import moment from "moment";
import { useState } from "react";
import deleteIcon from "../../assets/icons8-trash.svg";
import ShareIcon from "../../assets/share.svg";

const Answer = ({ data, setDeleteItemId, setDeleteOverlay, setDeleteUrl, user_id }) => {

  console.log(data);
  const [dropDown, setDropDown] = useState(false);

  const deleteAnswer = (id) =>{
    
    setDeleteItemId(id)
    setDeleteOverlay(true);
    setDeleteUrl("answer/delete");
  }
  return (
    <div className="ques-container">
      <div className="upvote-downvote-panel">
        <button className="up">
          <svg
            aria-hidden="true"
            className="svg-icon iconArrowDownLg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
          >
            <path d="M2 11h32L18 27 2 11Z"></path>
          </svg>
        </button>
        <p className="vote-count">
          {data.upvotes.length + data.downvotes.length}
        </p>
        <button className="down">
          <svg
            aria-hidden="true"
            className="svg-icon iconArrowDownLg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
          >
            <path d="M2 11h32L18 27 2 11Z"></path>
          </svg>
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
