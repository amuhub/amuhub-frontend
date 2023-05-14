import React from "react";
import { useParams } from "react-router-dom";
import { useFetchToken } from "../../utils/useFetch";
import { InfinitySpin } from "react-loader-spinner";
import QuesAns from "./QuesAns";
import baseUrl from "../../utils/constants";
import NoContent from "../NoContent/NoContent";

const ProfileAnswer = () => {
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/` + username + "/answers",
    token
  );
  console.log(data);

  return (
    <div>
      {pending && (
        <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}
      {error && <div>{error}</div>}
      {!pending && !data.data.length && (
        <NoContent text={"You haven't answered any questions yet!"} />
      )}
      {!pending &&
        data &&
        data.data.map((answerItem) => (
          <QuesAns answerItem={answerItem} key={answerItem._id} />
        ))}
    </div>
  );
};

export default ProfileAnswer;
