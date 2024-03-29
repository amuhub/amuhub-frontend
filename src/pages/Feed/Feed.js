import { React, useState } from "react";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import Post from "../../components/Post/Post";
import News from "../../components/News/News";
import Button from "../../components/Button/Button";
import { InfinitySpin } from "react-loader-spinner";
import "./Feed.css";
import baseUrl from "../../utils/constants";
import PostUploadOverlay from "../../components/PostUploadOverlay/PostUploadOverlay";
import Error from "../../components/Error";
import { useSearchParams } from "react-router-dom";
import NoMore from "../../components/NoContent/NoMore";

const Feed = () => {
  const token = localStorage.getItem("token");
  const [postUploadOverlay, setPostUploadOverlay] = useState(false);

  const [searchParams] = useSearchParams();
  const viewItemId = searchParams.get("open");
  

  const displayOverlay = () => {
    setPostUploadOverlay(true);
  };
  const hideOverlay = () => {
    setPostUploadOverlay(true);
  };
  const { data, pending, error } = useFetch(
    `https://api.amu.ac.in/api/v1/news?lang=en`
  );

  const {
    data: feed,
    pending: feedPending,
    error: feedError,
  } = useFetchToken(`${baseUrl}/feed/feed`, token);


  return (
    <>
      {feedError ? (
        <Error />
      ) : (
        <div className="common-container">
          <div className="feed-ques-header">
            <h1>See What's New</h1>
            <Button text="Create New Post" onClick={displayOverlay} />
          </div>
          <div className="grid-container">
            {feedPending && <InfinitySpin width="300" color="#6495ED" />}
            <div className="wrapper">
              {!feedPending &&
                !feedError &&
                feed.data &&
                feed.data.map((post) => (
                  <Post
                    key={feed.data._id}
                    data={post}
                    defaultToggleOverlay={viewItemId === post._id}
                  />
                ))}
              {!feedPending && !feedError && feed.data && (
                <NoMore text="No more posts to show" />
              )}
            </div>

            {pending && <InfinitySpin width="300" color="#6495ED" />}

            <div className="event-container">
              {data &&
                data.data.map((singleEvent) => (
                  <News key={singleEvent.id} data={singleEvent} />
                ))}
            </div>
          </div>
          {postUploadOverlay && (
            <PostUploadOverlay
              hideOverlay={hideOverlay}
              setPostUploadOverlay={setPostUploadOverlay}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
