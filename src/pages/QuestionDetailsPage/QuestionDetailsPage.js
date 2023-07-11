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
import reportIcon from "../../assets/flag.png";
import DeleteAlert from "../../components/DeleteAlert/DeleteAlert";
import { decodeToken } from "react-jwt";
import ShareIcon from "../../assets/share.svg";
import moment from "moment";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";


const Answers = () => {
  if (!isAuthenticated()) window.location.href = "/login";

  const token = localStorage.getItem("token");
  const decoded_token = decodeToken(token);
  const user_id = decoded_token.user.id;

  const answerBox = () => {
    setTextArea(!textArea);
  };

  const richHtml = (text) => {
    setHtmlText(text);
   
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
  const [load, setLoad] = useState(false)

  const {
    data: questionData,
    pending: questionPending,
    error: questionError,
  } = useFetchToken(`${baseUrl}/question/${id}`, token);

  console.log("this is question data : ");
  console.log(questionData);



  useEffect(() => {
    if (!questionPending && !questionError) {
      setIsDownvoted(questionData.data.downvoted);
      setIsUpvoted(questionData.data.upvoted);
      setUpvoteCnt(questionData.data.upvotes.length);
      setDownvoteCnt(questionData.data.downvotes.length);
    }
  }, [questionData, questionPending, questionError]);

 

  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );

  const deleteQuestion = (id) => {
    setDeleteItemId(id);
    setDeleteOverlay(true);
    setDeleteUrl("question");
  };

  const upvoteQues = async () => {
    if (isUpvoted) setIsUpvoted(false);
    else {
      setIsUpvoted(true);
      if (isDownvoted) setIsDownvoted(false);
    }
    const res = await postToken(`${baseUrl}/question/upvote/${id}`, {}, token);
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
   
  };

  const downvoteQues = async () => {
    if (isDownvoted) setIsDownvoted(false);
    else {
      setIsDownvoted(true);
      if (isUpvoted) setIsUpvoted(false);
    }
    const res = await postToken(
      `${baseUrl}/question/downvote/${id}`,
      {},
      token
    );
    setUpvoteCnt(res.data.data.upvotes.length);
    setDownvoteCnt(res.data.data.downvotes.length);
    
  };
  // ------------------start------------------

  const postAnswer = async (e) => {
    setLoad(true)
    e.preventDefault();
    const body = {
      ques: id,
      text: htmlText,
    };

    const res = await postToken(`${baseUrl}/answer/`, body, token);
    const data = await res.json;

    if (res) {
      setLoad(false)
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
          overlayToggle={setDeleteOverlay}
          deleteURL={deleteUrl}
          deleteItemId={deleteItemId}
        />
      )}
      <div className="common-container">
        <div className="answer-page grid-container">
        {questionPending && <InfinitySpin width="300" color="#6495ED" />}
          {!questionPending && questionData && (
            <div className="ques-ans-container">
              <div className="ques-container-outer">
                <div className="ques-container-inner">
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
                                <img src={reportIcon} alt="delete" />
                                <p>Report</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="author-details">
                  <Link to = {`/profile/${questionData.data.user.username}`}>
                    <div className="profile-div">
                      <div className="profile-img">
                        <img src={questionData.data.user.profile.pic} alt="profile" />
                      </div>
                      <p className="username">
                        <span className="answered-by">Asked By</span>{" "}
                        {questionData.data.user.username}
                      </p>
                    </div>
                  </Link>
                  <p className="answered-on">
                    Asked{" "}
                    <span>{moment(questionData.data.createdAt).fromNow()}</span>
                  </p>
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
                    className={
                      textArea ? "answer-form activeAnswerForm" : "answer-form"
                    }
                  >
                    <div className="input-div">
                      <RichTextEditor onChangeOfEditor={richHtml} />
                    </div>
                    <button className="btn" onClick = {postAnswer}>
                      { load ? <ButtonLoader/> : `Post Answer`}
                    </button>
                  </form>
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


          <div className="event-container">
          <h1 className="upcoming-event">Amu News</h1>
          {pending && <InfinitySpin width="300" color="#6495ED" />}
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
