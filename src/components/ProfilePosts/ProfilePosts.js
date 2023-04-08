import React from "react";
import "./ProfilePosts.css";
import { useParams } from "react-router-dom";
import postImg from "../Post/img.png";
import { useFetch } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import NoContent from "../NoContent/NoContent";
import { InfinitySpin } from "react-loader-spinner";
import ProfilePost from "./ProfilePost";

const ProfilePosts = () => {
  const { username } = useParams();
  const { data, pending, error } = useFetch(
    `${baseUrl}/profile/` + username + "/posts"
  );
  console.log("profile posts", data);

  return (
    <div>
      {pending && (
        <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}
      {error && <div>{error}</div>}
      {!pending && !data.data.length && 
      (
        <NoContent text={"You haven't asked any questions yet!"}/>
      )}
      <div className="post-grid">
      {!pending &&
        data &&
        data.data.map((postItem) => (
          <ProfilePost postItem={postItem} key={postItem._id} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
