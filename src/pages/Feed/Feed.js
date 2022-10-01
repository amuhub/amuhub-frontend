import Wrapper from '../../components/Wrapper/Wrapper'
import News from '../../components/News/News'
import Button from '../../components/Button/Button'

import './Feed.css'
const Feed = () => {
  return ( 
    <div className = "feed-ques-container">
      <div className='feed-ques-header'>
        <h1>See What's New</h1>
        <Button text = "Create New Post"/>
      </div>
      <div className = "feed-ques-page">
        <Wrapper/>
        <News/>
      </div>
    </div>

    
  )
}

export default Feed