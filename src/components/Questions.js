import React from "react";
import Question from "./Question/Question";

const Questions = () => {
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
  return (
    <>
      {question.map((question) => (
        <Question key={question.id} data={question} />
      ))}
    </>
  );
};

export default Questions;
