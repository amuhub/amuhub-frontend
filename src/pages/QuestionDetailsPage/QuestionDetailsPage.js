import News from "../../components/News/News";
import Answer from "../../components/Answer/Answer";
import useFetch from '../../utils/useFetch'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin } from  'react-loader-spinner';
import "./QuestionDetailsPage.css";


const Answers = () => {

  const answerBox = () => {
    setTextArea(!textArea);
  };
  const [textArea, setTextArea] = useState(false);
  const { id } = useParams();
  const { data, pending, error } = useFetch(`https://api.amu.ac.in/api/v1/home-events?lang=en`)

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
                  <a href="" className="answers_count">
                    <i className="fas fa-comment-alt"></i>14 answers
                  </a>
                  <a href="" className="views_count">
                    <i className="fas fa-eye"></i> 412 views
                  </a>
                </div>
                <a href="#" className="btn" onClick={answerBox}>
                  Answer
                </a>
              </div>
              <form
                className={
                  textArea ? "answer-form activeAnswerForm" : "answer-form"
                }
              >
                <div class="input-div">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5 "
                    placeholder="Your Answer Goes Here"
                  ></textarea>
                </div>
                <input type="submit" value="Post Answer" className="btn" />
              </form>
            </div>
          </div>
          <div className="wrapper">
            <Answer />
            <Answer />
            <Answer />
            <Answer />
          </div>
        </div>

        {pending && <InfinitySpin 
          width='300'
          color="#6495ED"
        />}

        <div className="event-container">
          {data && data.data.map((singleEvent)=> <News key = {singleEvent.id} data = {singleEvent}/>)}
        </div>
      </div>
    </div>
  );
};

export default Answers;
