import React from "react";
import { useParams } from "react-router-dom";
import { useFetch, useFetchToken } from "../../utils/useFetch";
import { InfinitySpin } from "react-loader-spinner";
import QuesAns from "./QuesAns";
import baseUrl from "../../utils/constants";

const ProfileAnswer = () => {
  const { username } = useParams();
  const { data, pending, error } = useFetch(
    `${baseUrl}/profile/` + username + "/answers"
  );
  console.log(data);

  return (
    <div>
      {pending && (
        <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}
      {error && <div>{error}</div>}
      {!pending &&
        data &&
        data.data.map((answerItem) => (
          <QuesAns answerItem={answerItem} key={answerItem._id} />
        ))}
    </div>
  );
};

export default ProfileAnswer;
