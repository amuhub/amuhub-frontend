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
import NoContent from "../../components/NoContent/NoContent";
import isAuthenticated from "../../utils/isAuth";
import NoMore from "../../components/NoContent/NoMore";

const QuestionListPage = () => {
  const token = localStorage.getItem("token");

  if (!isAuthenticated()) window.location.href = "/login";

  const {
    data: tagdata,
    pending: tagpending,
    error: tagerror,
  } = useFetchToken(`${baseUrl}/tag`, token);

  const {
    data: questiondata,
    pending: questionpending,
    error: questionerror,
  } = useFetchToken(`${baseUrl}/question/interests/tags/`, token);
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
          <Select
            options={options}
            isClearable
            onChange={handleSelect}
            placeholder="Select Tag"
          />
        </div>
        <div className="input-div" style={{ margin: "20px 0" }}>
          <RichTextEditor onChangeOfEditor={richHtml} />
        </div>

        <input
          type="submit"
          value="Post Question"
          className="btn btn-block"
          style={{ padding: "14px 25px" }}
        />
      </form>
      <div className="grid-container">
        {questionpending && <InfinitySpin width="300" color="#6495ED" />}
        <div className="wrapper">
          {!questionpending && questiondata.data.length === 0 && (
            <NoMore text="No Questions to show" />
          )}
          {questiondata &&
            questiondata.data.map((question) => (
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
