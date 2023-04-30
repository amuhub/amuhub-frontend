import "./Answer.css";
import moment from "moment";

const Answer = ({ data }) => {
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
        <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
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
