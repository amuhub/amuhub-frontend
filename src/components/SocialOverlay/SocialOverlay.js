import React from "react";
import "./SocialOverlay.css";
import ProfileCard from "./ProfileCard";
import { useFetchToken } from "../../utils/useFetch";
import NoContentTwo from "../NoContent/NoContentTwo";
import { InfinitySpin } from "react-loader-spinner";
import baseUrl from "../../utils/constants";

const SocialOverlay = ({ setSocialToggler, overlayID, username }) => {
  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/${username}/social/?social=${overlayID}`,
    token
  );

  return (
    <div className="social-overlay">
      <button className="close-btn" onClick={() => setSocialToggler(false)}>
        <i className="fas fa-times"></i>
      </button>
      <div className="social-container">
        <p className="social-title">{overlayID}</p>
        {/* {pending && (
          <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}
        {error && <div>{error}</div>}
        {!pending && !data.data.length && (
          <NoContent text={`You don't have any ${overlayID} yet !`} />
        )} */}
        {!pending &&
          data &&
          data.data.map((item) => (
            <ProfileCard
              data={item}
              setSocialToggler={setSocialToggler}
              key={item._id}
            />
          ))}
        {pending && <InfinitySpin width="300" color="#6495ED" />}
        {!pending && data && data.data.length === 0 && (
          <NoContentTwo text={`You don't have any ${overlayID} yet !`} />
        )}
      </div>
    </div>
  );
};

export default SocialOverlay;
