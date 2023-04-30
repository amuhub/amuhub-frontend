import News from "../../components/News/News";
import Answer from "../../components/Answer/Answer";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import baseUrl from "../../utils/constants";
import "./QuestionDetailsPage.css";
import moment from "moment";
import { Link } from "react-router-dom";
import postToken from "../../utils/postToken";

const Answers = () => {
  const token = localStorage.getItem("token");
  const answerBox = () => {
    setTextArea(!textArea);
  };

  const richHtml = (text) => {
    setHtmlText(text);
    console.log(htmlText);
  };

  const [htmlText, setHtmlText] = useState("");

  const addAnswer = async () => {
    console.log("add answer");
  };

  const [textArea, setTextArea] = useState(false);
  const { id } = useParams();

  const {
    data: questionData,
    pending: questionPending,
    error: questionError,
  } = useFetchToken(`${baseUrl}/question/${id}`, token);

  console.log(questionData);

  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );
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
    <div className="common-container">
      <div className="answer-page grid-container">
        {!questionPending && questionData && (
          <div className="ques-ans-container">
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
                  {questionData.data.upvotes.length +
                    questionData.data.downvotes.length}
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
                <p className="question">{questionData.data.ques}</p>
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
            <div className="wrapper">
              {questionData.data.answers.map((answer) => (
                <Answer key={answer.id} data={answer} />
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
  );
};

export default Answers;
