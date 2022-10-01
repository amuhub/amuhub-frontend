import Post from "../Post/Post"
import Question from "../Question/Question"
import './Wrapper.css'

const Wrapper = () => {
  return (
    <div className = "wrapper">
        {/* <Post/>
        <Post/>
        <Post/> */}
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
    </div> 
  )
}

export default Wrapper