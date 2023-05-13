import React from "react";
import "./ProfilePosts.css";
import { useParams } from "react-router-dom";
import postImg from "../Post/img.png";
import { useFetchToken } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";
import NoContent from "../NoContent/NoContent";
import { InfinitySpin } from "react-loader-spinner";
import ProfilePost from "./ProfilePost";
import { useSearchParams } from "react-router-dom";

const ProfilePosts = () => {
  const { username } = useParams();
  const token = localStorage.getItem("token")

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/` + username + "/posts",
    token
  );
  console.log("profile posts", data);

  const [searchParams] = useSearchParams();
  const viewItemId = searchParams.get("open");
  console.log(viewItemId);

  return (
    <div>
      {pending && (
        <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}
      {error && <div>{error}</div>}
      {!pending && !data.data.length && (
        <NoContent text={"You don't have any posts yet !"} />
      )}
      <div className="post-grid">
        {!pending &&
          data &&
          data.data.map((postItem) => (
            <ProfilePost
              postItem={postItem}
              key={postItem._id}
              defaultToggleOverlay={viewItemId === postItem._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
