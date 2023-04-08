import { React, useEffect, useState } from "react";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import Post from "../../components/Post/Post";
import News from "../../components/News/News";
import Button from "../../components/Button/Button";
import { InfinitySpin } from "react-loader-spinner";
import "./Feed.css";
import baseUrl from '../../utils/constants'
import PostUploadOverlay from "../../components/PostUploadOverlay/PostUploadOverlay";

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
  const token = localStorage.getItem("token");
  const [postUploadOverlay, setPostUploadOverlay] = useState(false);

  useEffect(()=>{
    console.log(postUploadOverlay);
  },[postUploadOverlay])

  const displayOverlay = ()=>{
    setPostUploadOverlay(true)
  }
  const hideOverlay = ()=>{
    setPostUploadOverlay(true)
  }
  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );
  console.log(data);


  const {data:feed, pending:feedPending, error:feedError} = useFetchToken(`${baseUrl}/feed/feed`, token)
  console.log(feed);

  return (
    <div className="common-container">
      <div className="feed-ques-header">
        <h1>See What's New</h1>
        <Button text="Create New Post" onClick={displayOverlay}/>
      </div>
      <div className="grid-container">
        <div className="wrapper">
          {!feedPending && feed.data.map((post) => (
            <Post key={feed.data._id} data={post} />
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
      {postUploadOverlay && <PostUploadOverlay hideOverlay = {hideOverlay} setPostUploadOverlay = {setPostUploadOverlay}/>}
    </div>
  ); 
};

export default Feed;
