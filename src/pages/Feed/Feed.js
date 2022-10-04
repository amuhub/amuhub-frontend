import { React } from "react";
import useFetch from '../../utils/useFetch'
import Post from "../../components/Post/Post";
import News from "../../components/News/News";
import Button from "../../components/Button/Button";
import { InfinitySpin } from  'react-loader-spinner';
import "./Feed.css";

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
];

const Feed = () => {

  const { data, pending, error } = useFetch(`https://api.amu.ac.in/api/v1/home-events?lang=en`)
  console.log(data);
  return (
    <div className="common-container">
      <div className="feed-ques-header">
        <h1>See What's New</h1>
        <Button text="Create New Post" />
      </div>
      <div className="grid-container">
        <div className="wrapper">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
        

        {pending && <InfinitySpin 
          width='300'
          color="#6495ED"
        />}

        <div className="event-container">
          
          {data && data.data.map((singleEvent)=> <News key = {singleEvent.id} data = {singleEvent}/>)}
          {/* // <News />
          // <News />
          // <News />
          // <News /> */}
        </div>
      </div>
    </div>
  );
};

export default Feed;
