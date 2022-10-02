import {React,useState} from 'react'
// import Wrapper from '../../components/Wrapper/Wrapper'
import Post from '../../components/Post/Post'
import News from '../../components/News/News'
import Button from '../../components/Button/Button'
import PostOverlay from '../Post_Overlay/PostOverlay';

import './Feed.css'
const Feed = () => {
  const [togglePostOverlay, setTogglePostOverlay] = useState(false)

  const postOverlaytoggler=() => {
    togglePostOverlay===true?setTogglePostOverlay(false):setTogglePostOverlay(true);
};

  return ( 
    <div className = "feed-ques-container">
      <div className='feed-ques-header'>
        <h1>See What's New</h1>
        <Button text = "Create New Post"/>
      </div>
      <div className = "feed-ques-page">
      <div className = "wrapper">
        <Post postOverlaytoggler={postOverlaytoggler}/>
        {/* <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/> */}
    </div> 
        {togglePostOverlay && <PostOverlay postOverlaytoggler={postOverlaytoggler}/>}
        
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

export default Feed