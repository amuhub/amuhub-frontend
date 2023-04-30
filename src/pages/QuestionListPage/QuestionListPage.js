import { React, useEffect } from "react";
// import Wrapper from '../../components/Wrapper/Wrapper'
import { useFetch, useFetchToken } from "../../utils/useFetch";
import Question from "../../components/Question/Question";
import News from "../../components/News/News";
import Button from "../../components/Button/Button";
import { InfinitySpin } from "react-loader-spinner";
import "../Feed/Feed.css";
import { useState } from "react";
import postToken from "../../utils/postToken";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import Select from "react-select";
import baseUrl from "../../utils/constants";

const question = [
  {
    id: 1,
    ques: "How do I get a job in the tech industry?",
    answers: 14,
    views: 100,
    upvote: 4,
    downvote: 2,
  },
  {
    id: 2,
    ques: "How to get used to the new normal?",
    answers: 14,
    views: 20,
    upvote: 54,
    downvote: 21,
  },
  {
    id: 3,
    ques: "What is react?",
    answers: 4,
    views: 10,
    upvote: 54,
    downvote: 21,
  },
  {
    id: 4,
    ques: "What is django?",
    answers: 4,
    views: 10,
    upvote: 54,
    downvote: 21,
  },
];

const QuestionListPage = () => {
  const token = localStorage.getItem("token");
  const {
    data: tagdata,
    pending: tagpending,
    error: tagerror,
  } = useFetchToken(`${baseUrl}/tag`, token);
  // console.log(tagdata);

  const [tags, setTags] = useState();
  var options = [];
  if (!tagpending) {
    tagdata.data.map((tag) => {
      options.push({ value: tag._id, label: tag.name });
    });
  }

  const handleSelect = (selectedOption) => {
    setTags(selectedOption?.value);
  };

  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );
  const [textArea, setTextArea] = useState(false);
  const [htmlText, setHtmlText] = useState("");

  const answerBox = () => {
    setTextArea(!textArea);
  };
  const richHtml = (text) => {
    setHtmlText(text);
  };

  const submitQues = async (e) => {
    e.preventDefault();
    const body = {
      ques: htmlText,
      tag: tags,
    };

    const res = await postToken(`${baseUrl}/question/`, body, token);
    const data = await res.json;
    console.log(data);
    if (res) {
      window.location.reload();
    } else {
      console.log("error");
    }
  };

  return (
    <div className="common-container">
      <div className="feed-ques-header">
        <h1>Latest Questions</h1>
        <Button text="Ask a question" onClick={answerBox} />
      </div>

      <form
        onSubmit={submitQues}
        className={textArea ? "answer-form activeAnswerForm" : "answer-form"}
      >
        <div className="form-control">
          <Select options={options} isClearable onChange={handleSelect} />
        </div>
        <div className="input-div">
          <RichTextEditor onChangeOfEditor={richHtml} />
        </div>

        <input type="submit" value="Post Question" className="btn" />
      </form>
      <div className="grid-container">
        <div className="wrapper">
          {question.map((question) => (
            <Question key={question.id} data={question} />
          ))}
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

export default QuestionListPage;
