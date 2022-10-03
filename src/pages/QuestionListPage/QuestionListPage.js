import {React} from 'react'
// import Wrapper from '../../components/Wrapper/Wrapper'
import Question from '../../components/Question/Question'
import News from '../../components/News/News'
import Button from '../../components/Button/Button'
import '../Feed/Feed.css';

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
]

const QuestionListPage = () => {
  

  return ( 
    <div className = "common-container">
      <div className='feed-ques-header'>
        <h1>Latest Questions</h1>
        <Button text = "Ask a question"/>
      </div>
      <div className = "grid-container">
      <div className = "wrapper">
        {question.map((question) => (
            <Question key = {question.id} data={question}/>
        ))}
    </div>
        <div className="event-container">
          <News/>
          <News/>
          <News/>
          <News/>
        </div>
      </div>
    </div>

    
  )
}

export default QuestionListPage;