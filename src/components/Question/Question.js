import "./Question.css";

const Question = (props) => {
  const { ques, answers, views, upvote, downvote } = props.data;
  return (
    <div className="question_container">
      <div className="question_header">
        <div className="user_img"></div>
        <div className="question_info">
          <div>
            <p>
              Asked : <span className="timestamp">March 28, 2018</span>
            </p>
            <p>
              Tags : <span className="tags">Movies, Series</span>
            </p>
          </div>
          <p className="question">{ques}</p>
        </div>
      </div>
      <div className="question_stats">
        <div className="stats_list_a">
          <a href="" className="answers_count">
            <i className="fas fa-comment-alt"></i>
            {answers} <span>answers</span>
          </a>
          <a href="" className="views_count">
            <i className="fas fa-eye"></i> {views} <span>views</span>
          </a>
        </div>
        <div className="stats_list_b">
          {/* <!-- <input type="radio" name="upvote_downvote" id="upvote">
                <label for="upvote">Upvote</label>

                <input type="radio" name="upvote_downvote" id="downvote">
                <label for="downvote">Downvote</label> --> */}

          <a href="" className="upvote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{upvote}</span>
          </a>
          <a href="" className="downvote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{downvote}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Question;
