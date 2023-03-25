import News from "../../components/News/News";
import Answer from "../../components/Answer/Answer";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import "./QuestionDetailsPage.css";
import { Link } from "react-router-dom";

const Answers = () => {
  const answerBox = () => {
    setTextArea(!textArea);
  };

  const richHtml = (text) => {
    setHtmlText(text);
    console.log(htmlText);
  };
  const addAnswer = () => {
    const updatedAnswerList = [
      ...answerList,
      {
        id: answerList.length + 1,
        answerText: htmlText,
      },
    ];
    setAnswerList(updatedAnswerList);
    console.log(answerList);
  };

  const [htmlText, setHtmlText] = useState("");

  const [answerList, setAnswerList] = useState([
    {
      id: 1,
      answerText:
        "<p>Django officially supports the following databases:</p> <ul></li>PostgreSQL</li><li> MariaDB</li><li> MySQL</li> <li>Oracle</li><li> SQLite</li></ul> There are also a number of database backends provided by third parties. Django attempts to support as many features  as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely.",
    },

    {
      id: 2,
      answerText:
        "Django officially supports the following databases: PostgreSQL MariaDB MySQL Oracle SQLite There are also a number of database backends provided by third parties. Django attempts to support as many features  as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely.",
    },
    {
      id: 3,
      answerText:
        "Django officially supports the following databases: PostgreSQL MariaDB MySQL Oracle SQLite There are also a number of database backends provided by third parties. Django attempts to support as many features  as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely.",
    },
  ]);

  const [textArea, setTextArea] = useState(false);

  const { id } = useParams();

  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/home-events?lang=en`
  );

  return (
    <div className="common-container">
      <div className="answer-page grid-container">
        <div className="ques-ans-container">
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
              <p className="vote-count">{id}</p>
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
              <p className="question">
                Ise banane mein mere L lag gye.....classes clash kr rhi
                thin...nye nye naam sochte sochte dimaag ka dahi ho gya?Ab mujhe
                samajh nhi aa rha ke question ko lamba krne ke liye aur kya
                likhun
              </p>
              <div className="question_stats">
                <div className="stats_list_a">
                  <Link to="" className="answers_count">
                    <i className="fas fa-comment-alt"></i>14{" "}
                    <span>answers</span>
                  </Link>
                  <Link to="" className="views_count">
                    <i className="fas fa-eye"></i> 412 <span>views</span>
                  </Link>
                </div>
                <Link to="#" className="btn" onClick={answerBox}>
                  Answer
                </Link>
              </div>
              <form
                onSubmit={addAnswer}
                className={
                  textArea ? "answer-form activeAnswerForm" : "answer-form"
                }
              >
                <div class="input-div">
                  <RichTextEditor onChangeOfEditor={richHtml} />
                </div>
                <input type="submit" value="Post Answer" className="btn" />
              </form>
            </div>
          </div>
          <div className="wrapper">
            {answerList.map((answer) => (
              <Answer key={answer.id} data={answer} />
            ))}
          </div>
        </div>

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
