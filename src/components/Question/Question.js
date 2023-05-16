import "./Question.css";
import { Link } from "react-router-dom";
import { fetchDate } from "../../utils/parseDate";
import moment from "moment";
import { useState } from "react";
import postToken from "../../utils/postToken";
import baseUrl from "../../utils/constants";

const Question = (props) => {
  const { _id, user, ques, tag, answer_count, upvotes, downvotes, createdAt } =
    props.data;
  const { year, month_name, day_num } = fetchDate(createdAt);

  const token = localStorage.getItem("token");
  const [isUpvoted, setIsUpvoted] = useState(props.data.upvoted);
  const [isDownvoted, setIsDownvoted] = useState(props.data.downvoted);
  const [upvoteCnt, setUpvoteCnt] = useState(upvotes.length);
  const [downvoteCnt, setDownvoteCnt] = useState(downvotes.length);

  // console.log("HIII");
  // console.log(props.data);

  const upvoteQues = async () => {
    if (isUpvoted) setIsUpvoted(false);
    else {
      setIsUpvoted(true);
      if (isDownvoted) setIsDownvoted(false);
    }
    const res = await postToken(`${baseUrl}/question/upvote/${_id}`, {}, token);
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
    console.log(res.data.data);
  };

  const downvoteQues = async () => {
    if (isDownvoted) setIsDownvoted(false);
    else {
      setIsDownvoted(true);
      if (isUpvoted) setIsUpvoted(false);
    }
    const res = await postToken(
      `${baseUrl}/question/downvote/${_id}`,
      {},
      token
    );
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
    console.log(res.data.data);
  };

  // Upvote Button
  // 1 - check initial state - true/false
  // if true - call upvote api and setUpvote state to false
  //if false - call upvote api and set upvote state to true and if downvote state is true set that to false

  return (
    <div className="question_container">
      <div className="question_header">
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
          <Link to={`/question/${_id}`}>
            <p
              className="question"
              dangerouslySetInnerHTML={{ __html: ques }}
            ></p>
          </Link>
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
          <Link
            to=""
            className={`upvote ${isUpvoted ? "isUpvotedDownvoted" : ""}`}
            onClick={upvoteQues}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{upvoteCnt}</span>
          </Link>
          <Link
            to=""
            className={`downvote ${isDownvoted ? "isUpvotedDownvoted" : ""}`}
            onClick={downvoteQues}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-8v5h-12v6h12v5z" />
            </svg>
            <span>{downvoteCnt}</span>
          </Link>
        </div>
      </div>
      <div className="author-details">
        <div className="profile-div">
          <div className="profile-img">
            <img src={user.profile.pic}></img>
          </div>
          <p className="username">
            <span className="answered-by">Asked By</span> {user.name}
          </p>
        </div>
        <p className="answered-on">
          Asked <span>{moment(createdAt).fromNow()}</span>
        </p>
      </div>
    </div>
  );
};

export default Question;
