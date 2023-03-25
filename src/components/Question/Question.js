import "./Question.css";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { ques, answers, views, upvote, downvote } = props.data;
  return (
    <div className="question_container">
      <div className="question_header">
        {/* <div className="user_img"></div> */}
        <div className="question_info">
          <div>
            <p>
              Asked On: <span className="timestamp">March 28, 2018</span>
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
          <Link to="" className="answers_count">
            <i className="fas fa-comment-alt"></i>
            {answers} <span>answers</span>
          </Link>
          {/* <Link to="" className="views_count">
            <i className="fas fa-eye"></i> {views} <span>views</span>
          </Link> */}
        </div>
        <div className="stats_list_b">
          <Link to="" className="upvote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{upvote}</span>
          </Link>
          <Link to="" className="downvote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{downvote}</span>
          </Link>
        </div>
      </div>
      <div className="author-details">
        <div className="profile-div">
          <div className="profile-img"></div>
          <p className="username">
            <span className="answered-by">Asked By</span> Hasan Faraz
          </p>
        </div>
        <p className="answered-on">
          Asked <span>2 hours ago</span>
        </p>
      </div>
    </div>
  );
};

export default Question;
