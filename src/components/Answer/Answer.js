import "./Answer.css";

const Answer = ({data}) => {
  return (
    <div className="ques-container">
      <div className="upvote-downvote-panel">
        <button className="up">
          <svg
            aria-hidden="true"
            class="svg-icon iconArrowDownLg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
          >
            <path d="M2 11h32L18 27 2 11Z"></path>
          </svg>
        </button>
        <p className="vote-count">125</p>
        <button className="down">
          <svg
            aria-hidden="true"
            class="svg-icon iconArrowDownLg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
          >
            <path d="M2 11h32L18 27 2 11Z"></path>
          </svg>
        </button>
      </div>
      <div className="question-header">
        <div  dangerouslySetInnerHTML={{__html : data.answerText}}></div>
        <div className="author-details">
          <div className="profile-div">
            <div className="profile-img"></div>
            <p className="username">
              <span className="answered-by">Answered By</span> Hasan Faraz
            </p>
          </div>
          <p className="answered-on">
            Answered <span>2 hours ago</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
