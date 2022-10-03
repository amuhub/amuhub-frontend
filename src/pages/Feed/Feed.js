import {React} from 'react';
// import Wrapper from '../../components/Wrapper/Wrapper'
import Post from '../../components/Post/Post'
import News from '../../components/News/News'
import Button from '../../components/Button/Button'
import './Feed.css';

const posts = [
  {
    id: 1,
    likes: 100,
    author: "Falana",
  },
  {
    id: 2,
    likes: 200,
    author: "Damilola",
  },
  {
    id: 3,
    likes: 300,
    author: "Oluwaseun",
  },
]

const Feed = () => {
  

  return ( 
    <div className = "feed-ques-container">
      <div className='feed-ques-header'>
        <h1>See What's New</h1>
        <Button text = "Create New Post"/>
      </div>
      <div className = "feed-ques-page">
      <div className = "wrapper">
        {posts.map((post) => (
          <Post key = {post.id} data={post}/>
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

export default Feed