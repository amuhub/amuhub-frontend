import News from "../../components/News/News";
import Answer from "../../components/Answer/Answer";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import baseUrl from "../../utils/constants";
import "./QuestionDetailsPage.css";
import { Link } from "react-router-dom";
import postToken from "../../utils/postToken";
import NoContent from "../../components/NoContent/NoContent";
import isAuthenticated from "../../utils/isAuth";
import deleteIcon from "../../assets/icons8-trash.svg";
import DeleteAlert from "../../components/DeleteAlert/DeleteAlert";
import { decodeToken } from "react-jwt";
import ShareIcon from "../../assets/share.svg";

const Answers = () => {
  if (!isAuthenticated()) window.location.href = "/login";

  const token = localStorage.getItem("token");
  const decoded_token = decodeToken(token);
  const user_id = decoded_token.user.id;
  console.log(user_id);

  const answerBox = () => {
    setTextArea(!textArea);
  };

  const richHtml = (text) => {
    setHtmlText(text);
    console.log(htmlText);
  };

  const [htmlText, setHtmlText] = useState("");

  const [textArea, setTextArea] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState("");
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const { id } = useParams();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvoteCnt, setUpvoteCnt] = useState(0);
  const [downvoteCnt, setDownvoteCnt] = useState(0);

  const {
    data: questionData,
    pending: questionPending,
    error: questionError,
  } = useFetchToken(`${baseUrl}/question/${id}`, token);

  useEffect(() => {
    if (!questionPending && !questionError) {
      setIsDownvoted(questionData.data.downvoted);
      setIsUpvoted(questionData.data.upvoted);
      setUpvoteCnt(questionData.data.upvotes.length);
      setDownvoteCnt(questionData.data.downvotes.length);
    }
  }, [questionData, questionPending, questionError]);

  console.log("this is question data");
  console.log(questionData);

  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );

  const deleteQuestion = (id) => {
    setDeleteItemId(id);
    setDeleteOverlay(true);
    setDeleteUrl("question");
  };

  const upvoteQues = async () => {
    const res = await postToken(`${baseUrl}/question/upvote/${id}`, {}, token);
    if (isUpvoted) setIsUpvoted(false);
    else {
      setIsUpvoted(true);
      if (isDownvoted) setIsDownvoted(false);
    }
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
    console.log(res.data.data);
  };

  const downvoteQues = async () => {
    const res = await postToken(
      `${baseUrl}/question/downvote/${id}`,
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
    console.log(res.data.data);
  };
  // ------------------start------------------

  const postAnswer = async (e) => {
    e.preventDefault();
    const body = {
      ques: id,
      text: htmlText,
    };

    const res = await postToken(`${baseUrl}/answer/`, body, token);
    const data = await res.json;
    console.log(data);
    if (res) {
      window.location.reload();
    } else {
      console.log("error");
    }
  };
  // ------------------end------------------

  return (
    <>
      {deleteOverlay && (
        <DeleteAlert
          text="question"
          overlayToggle={setDeleteOverlay}
          deleteURL={deleteUrl}
          deleteItemId={deleteItemId}
        />
      )}
      <div className="common-container">
        <div className="answer-page grid-container">
          {!questionPending && questionData && (
            <div className="ques-ans-container">
              <div className="ques-container">
                <div className="upvote-downvote-panel">
                  <button
                    className={`up ${isUpvoted ? "upvote-active" : ""}`}
                    onClick={upvoteQues}
                  >
                    <div class="upvote-triangle"></div>
                    <div className="upvote-count">{upvoteCnt}</div>
                  </button>

                  <button
                    className={`down ${isDownvoted ? "downvote-active" : ""}`}
                    onClick={downvoteQues}
                  >
                    <div class="downvote-triangle"></div>
                    <div className="downvote-count">{downvoteCnt}</div>
                  </button>
                </div>
                <div className="question-header">
                  <div className="flex-row">
                    <p
                      className="question"
                      dangerouslySetInnerHTML={{
                        __html: questionData.data.ques,
                      }}
                    ></p>
                    <div
                      className="three-dots"
                      onClick={() => setDropDown(!dropDown)}
                    >
                      <i className="fas fa-ellipsis-h"></i>
                      <div className="drop-down-wrapper">
                        {dropDown && (
                          <div className="drop-down">
                            {isAuthenticated() ===
                              questionData.data.user.username && (
                              <div
                                className="drop-down-item"
                                onClick={() =>
                                  deleteQuestion(questionData.data._id)
                                }
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
                              <img src={deleteIcon} alt="delete" />
                              <p>Report</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="question_stats">
                    <div className="stats_list_a">
                      <Link to="" className="answers_count">
                        <i className="fas fa-comment-alt"></i>
                        {questionData.data.answers.length} <span>answers</span>
                      </Link>
                    </div>
                    <Link to="#" className="btn" onClick={answerBox}>
                      Answer
                    </Link>
                  </div>
                  <form
                    onSubmit={postAnswer}
                    className={
                      textArea ? "answer-form activeAnswerForm" : "answer-form"
                    }
                  >
                    <div className="input-div">
                      <RichTextEditor onChangeOfEditor={richHtml} />
                    </div>
                    <input type="submit" value="Post Answer" className="btn" />
                  </form>
                </div>
              </div>
              <div className="divider">
                <p>Answers</p>
              </div>
              <div className="wrapper">
                {!questionPending && !questionData.data.answers.length && (
                  <NoContent
                    text={"This question does not have any answers yet!"}
                  />
                )}
                {questionData.data.answers.map((answer) => (
                  <Answer
                    key={answer.id}
                    data={answer}
                    setDeleteOverlay={setDeleteOverlay}
                    setDeleteItemId={setDeleteItemId}
                    setDeleteUrl={setDeleteUrl}
                    user_id={user_id}
                  />
                ))}
              </div>
            </div>
          )}

          {pending && <InfinitySpin width="300" color="#6495ED" />}

          <div className="event-container">
            {data &&
              data.data.map((singleEvent) => (
                <News key={singleEvent.id} data={singleEvent} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Answers;
