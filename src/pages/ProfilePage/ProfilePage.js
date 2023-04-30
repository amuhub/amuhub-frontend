import React, { useState } from "react";
import "./ProfilePage.css";
import { Outlet, Link, NavLink } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import ProfileEditForm from "../../components/ProfileEditForm/ProfileEditForm";
import SocialOverlay from "../../components/SocialOverlay/SocialOverlay";
import { useParams } from "react-router-dom";
import { useFetch, useFetchToken } from "../../utils/useFetch.js";
import { InfinitySpin } from "react-loader-spinner";
import baseUrl from "../../utils/constants";
import ProfileImgOverlay from "../../components/ProfileImgOverlay/ProfileImgOverlay";
import isAuthenticated from "../../utils/isAuth";
import axios from "axios";

const ProfilePage = () => {
  const { username } = useParams();
  const [formToggler, setFormToggler] = useState(false);
  const [socialToggler, setSocialToggler] = useState(false);
  const [overlayId, setOverlayId] = useState("");
  const token = localStorage.getItem("token");
  const [changePicOverlay, setChangePicOverlay] = useState(false);
  const isLoggedInUser = isAuthenticated() === username;

  const formToggle = () => {
    setFormToggler(!formToggler);
  };
  const useToggleFollow = () => {
    axios
      .get(`${baseUrl}/profile/follow/${username}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log("toggle follow");
      })
      .catch((err) => {
        console.log(err.message);
      });
    window.location.reload();
  };

  const socialToggle = (e) => {
    e.preventDefault();
    setOverlayId(e.currentTarget.id);
    setSocialToggler(true);
  };

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/` + username,
    token
  );
  console.log("profile data", data);

  return (
    <>
      <div className="common-container">
        <div className="grid-container">
          {pending && <InfinitySpin width="300" color="#6495ED" />}
          {!pending && !error && data.data && (
            <div className="profile-container">
              <div className="profile-section">
                <div className="profile-img">
                  <img src={data.data.pic} alt="xy" />
                  <div
                    className="img-edit-overlay"
                    onClick={() => setChangePicOverlay(true)}
                  >
                    <div className="edit-blue-bg">
                      <i className="far fa-edit"></i>
                    </div>
                  </div>
                </div>
                <div className="profile-info-container">
                  <div className="profile-info">
                    <div className="info-inner">
                      <p className="profile-name">{data.data.username}</p>
                      {!isLoggedInUser && data.data.auth && (
                        <Link
                          to="#"
                          className={`btn-sec ${
                            data.data.isFollowing ? "followed" : ""
                          }`}
                          onClick={useToggleFollow}
                        >
                          {data.data.isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      )}
                      {isLoggedInUser && (
                        <Link
                          to="#"
                          className={`btn btn-sec`}
                          onClick={formToggle}
                        >
                          Edit Profile
                        </Link>
                      )}
                    </div>

                    <p className="bio">
                      {" "}
                      {data.data.bio ? (
                        data.data.bio
                      ) : (
                        <Link
                          to=""
                          className="profile-add-links"
                          onClick={formToggle}
                          style={{ display: "inline-block" }}
                        >
                          Add Bio
                        </Link>
                      )}
                    </p>
                    <div className="location">
                      <p>
                        <i className="fas fa-map-marker-alt"></i>
                        {data.data.location ? (
                          data.data.location
                        ) : (
                          <Link
                            to=""
                            className="profile-add-links"
                            onClick={formToggle}
                            style={{ display: "inline-block" }}
                          >
                            Add Location
                          </Link>
                        )}
                      </p>
                      <p>
                        <i className="fas fa-graduation-cap"></i>
                        {data.data.department ? (
                          data.data.department
                        ) : (
                          <Link
                            to=""
                            className="profile-add-links"
                            onClick={formToggle}
                          >
                            Add Department
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="stats">
                    <Link to="" id="followers" onClick={socialToggle}>
                      <div className="stats-item">
                        {data.data.follower.length}
                        <span>followers</span>
                      </div>
                    </Link>
                    <Link to="" id="following" onClick={socialToggle}>
                      <div className="stats-item">
                        {data.data.following.length}
                        <span>following</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="profile-links">
                <NavLink to="answers" className="links">
                  Answers
                </NavLink>
                <NavLink to="questions" className="links">
                  Questions
                </NavLink>
                <NavLink to="posts" className="links">
                  Posts
                </NavLink>
              </div>
              <div className="wrapper">
                <Outlet />
              </div>
            </div>
          )}

          {!pending && !error && data.data && (
            <div className="tags-container">
              <div className="header">
                <h1>Interests</h1>
                <i className="far fa-edit" onClick={formToggle}></i>
              </div>
              <div className="tags">
                {data.data.interest.length ? (
                  data.data.interest.map((tag, index) => (
                    <Tag key={index} title={tag.name} />
                  ))
                ) : (
                  <p style={{ margin: "0 auto", fontSize: "16px" }}>
                    No Interest chosen yet!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {formToggler && (
        <ProfileEditForm
          onClick={formToggle}
          usernameProp={username}
          loc={data.data.location}
          dept={data.data.department}
          desc={data.data.bio}
          tags={data.data.interest}
        />
      )}
      {socialToggler && (
        <SocialOverlay
          setSocialToggler={setSocialToggler}
          overlayID={overlayId}
          following={data.data.following}
          followers={data.data.follower}
        />
      )}
      {changePicOverlay && (
        <ProfileImgOverlay
          setChangePicOverlay={setChangePicOverlay}
          username={username}
        />
      )}
    </>
  );
};

export default ProfilePage;
