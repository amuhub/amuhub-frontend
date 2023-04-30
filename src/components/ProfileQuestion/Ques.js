import "../Question/Question.css";
import { fetchDate } from "../../utils/parseDate";
import { Link } from "react-router-dom";

const Ques = (props) => {
  const {
    _id,
    ques,
    upvotes,
    downvotes,
    tag,
    answer_count,
    updatedAt,
    createdAt,
  } = props.quesItem;
  const { year, month_name, day_num } = fetchDate(createdAt);
  return (
    <div className="question_container">
      <div className="question_header">
        {/* <div className="user_img"></div> */}
        <div className="question_info">
          <div>
            <p>
              Asked On:{" "}
              <span className="timestamp">{`${month_name} ${day_num}, ${year}`}</span>
            </p>
            <p>
              Tags : <span className="tags">{tag.name}</span>
            </p>
          </div>
          <p
            className="question"
            dangerouslySetInnerHTML={{ __html: ques }}
            onClick={() => (window.location.href = `/question/${_id}`)}
          ></p>
        </div>
      </div>
      <div className="question_stats">
        <div className="stats_list_a">
          <Link to="" className="answers_count">
            <i className="fas fa-comment-alt"></i>
            {answer_count} <span>answers</span>
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
            <span>{upvotes.length}</span>
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
            <span>{downvotes.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ques;
