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
import isAuthenticated from "../../utils/isAuth";
import NoMore from "../../components/NoContent/NoMore";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

const QuestionListPage = () => {
  const token = localStorage.getItem("token");
  const [load, setLoad] = useState(false)

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
    setLoad(true)
    e.preventDefault();
    const body = {
      ques: htmlText,
      tag: tags,
    };

    const res = await postToken(`${baseUrl}/question/`, body, token);
    const data = await res.json;

    if (res) {
      setLoad(true)
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
          <div className="select-div" style={{position : "relative", zIndex : 5}}>
            <Select
              options={options}
              isClearable
              onChange={handleSelect}
              placeholder="Select Tag"
              // styles={{
              //   control: (baseStyles, state) => ({
              //     ...baseStyles,
              //     borderColor: state.isFocused ? 'grey' : 'red',
              //     zIndex : 5,
              //   }),
              // }}
            />
          </div>
        </div>
        <div className="input-div" style={{ margin: "20px 0" }}>
          <RichTextEditor onChangeOfEditor={richHtml} />
        </div>

        <button className="btn btn-block" onClick = {submitQues}>
            { load ? <ButtonLoader/> : `Post Question`}
        </button>
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

        <div className="event-container">
        {pending && <InfinitySpin width="300" color="#6495ED" margin = "0 auto" />}
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
