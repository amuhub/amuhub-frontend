import React from "react";
import { useParams } from "react-router-dom";
import { useFetchToken } from "../../utils/useFetch";
import { InfinitySpin } from "react-loader-spinner";
import Ques from "./Ques";
import baseUrl from "../../utils/constants";
import NoContent from "../NoContent/NoContent";

const ProfileQuestion = () => {
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/${username}/questions`,
    token
  );

  return (
    <div>
      {pending && (
        <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}
      {error && <div>{error}</div>}
      {!pending && !data.data.length && (
        <NoContent text={"No questions yet!"} />
      )}
      {!pending &&
        data &&
        data.data.map((quesItem) => (
          <Ques quesItem={quesItem} key={quesItem._id} />
        ))}
    </div>
  );
};

export default ProfileQuestion;
