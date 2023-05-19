import React from "react";
import { Link } from "react-router-dom";
import { fetchDate } from "../../utils/parseDate";

const QuesAns = ({ answerItem }) => {
  const { year, month_name, day_num, finalHour, finalMin, AMPM } = fetchDate(
    answerItem.question.createdAt
  );
  return (
    <div className="ques-container-1">
      <div className="question_container">
        <Link to={`/question/${answerItem.question._id}`}>
          <p
            className="question"
            dangerouslySetInnerHTML={{ __html: answerItem.question.ques }}
          ></p>
        </Link>
        <div className="question-header">
          <div dangerouslySetInnerHTML={{ __html: answerItem.text }} style = {{"font-size" : "12px"}}></div>
          <div className="author-details">
            <Link to = {`/profile/${answerItem.askedByUser.username}`}>
              <div className="profile-div">
                <div className="profile-img">
                  <img src={answerItem.askedByProfile.pic} alt="profile" />
                </div>
                <p className="username">
                  <span className="answered-by">Asked By</span>{" "}
                  {answerItem.askedByUser.username}
                </p>
              </div>
            </Link>
            <p className="answered-on">
              Asked{" "}
              <span>{`${day_num} ${month_name}, ${year} ${finalHour}:${finalMin} ${AMPM}`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuesAns;
