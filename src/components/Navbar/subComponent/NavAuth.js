import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import isAuthenticated from "../../../utils/isAuth";
import { useFetchToken } from "../../../utils/useFetch";
import baseUrl from "../../../utils/constants";
import ProfileOverview from "../../ProfileOverview/ProfileOverview";
import useDebounce from "../../../utils/debounceHook";
import cross from "../../../assets/navbar/multiply-svgrepo-com.svg";
import Notification from "../../Notification/Notification";
import sleepingbell from "../../../assets/navbar/sleeping-bell.gif";

const NavAuth = ({ usertext, setHeight }) => {
  const [menu, setmenu] = useState(false);
  const [searchResultsDisplay, setSearchResultsDisplay] = useState(false);
  // const [showCross, setShowCross]
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [notificationDisplay, setNotificationDisplay] = useState(false);
  const isEmpty = !searchData || searchData.length === 0;

  const navToggle = (e) => {
    setmenu(!menu);
  };

  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/${usertext}`,
    token
  );

  const {
    data: notificationData,
    pending: notificationPending,
    error: notificationError,
  } = useFetchToken(`${baseUrl}/notification/`, token);

  const logoutUser = () => {
    if (isAuthenticated()) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
    }
  };

  const searchClose = () => {
    setQuery("");
    setSearchResultsDisplay(false);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "") setSearchResultsDisplay(false);
    setQuery(e.target.value);
  };

  const prepareQuery = (query) => {
    const url = `${baseUrl}/profile/?search=${query}`;
    return encodeURI(url);
  };

  const searchProfile = async () => {
    if (!query || query.trim === "") {
      return;
    }
    const URL = prepareQuery(query);

    try {
      const res = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSearchData(data.data);
        setSearchResultsDisplay(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useDebounce(query, 500, searchProfile);

  isAuthenticated()

  return (
    <>
      <div className={menu ? "nav-links-list-a active" : "nav-links-list-a"}>
        <div className="mobile-style-wrapper">
          <i className="fa fa-times" aria-hidden="true" onClick={navToggle}></i>
          <ul>
            <li>
              <Link to="/" onClick={navToggle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/feed" onClick={navToggle}>
                Feed
              </Link>
            </li>
            <li>
              <Link to="/question" onClick={navToggle}>
                Questions
              </Link>
            </li>
            <li>
              <Button
                text="Logout"
                btnClass="mobile-logout"
                onClick={logoutUser}
              />
            </li>
          </ul>
        </div>
        <div className="search-container">
          <div className="search-div" onClick={setHeight}>
            <div className="search-icon">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <input
              type="text"
              placeholder="Search"
              onChange={changeHandler}
              value={query}
            />
            {query && (
              <div className="search-cancel" onClick={searchClose}>
                <img src={cross} alt="close-btn" />
              </div>
            )}
          </div>
          {searchResultsDisplay && (
            <div className="search-results">
              {isEmpty ? (
                <div className="no-results">No Result Found</div>
              ) : (
                searchData.map((profile) => (
                  <ProfileOverview
                    key={profile._id}
                    name={profile.name}
                    username={profile.username}
                    pic={profile.profile.pic}
                    setSearchResultsDisplay={setSearchResultsDisplay}
                    setQuery={setQuery}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="nav-links-list-b">
        {/* <Button text='Ask Question' /> */}
        <div className="notification-icon-outer">
          <div
            className="notification-icon"
            onClick={() => setNotificationDisplay(!notificationDisplay)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z" />
            </svg>
            {!notificationPending &&
              notificationData.data.filter((item) => !item.isViewed).length >
                0 && (
                <div className="notification">
                  {
                    notificationData.data.filter((item) => !item.isViewed)
                      .length
                  }
                </div>
              )}
          </div>

          {notificationDisplay && (
            <div className="notification-container">
              <h1>Notifications</h1>
              {!notificationPending &&
                notificationData.data.map((notification) => (
                  <Notification key={notification.id} data={notification} />
                ))}
              {notificationPending && (
                <div className="notification-pending">Loading...</div>
              )}
              {notificationData.data.length === 0 && !notificationPending && (
                <div className="notification-pending">
                  <img src={sleepingbell}></img>
                </div>
              )}
              <div className="triangle"></div>
            </div>
          )}
        </div>
        <Link to={`profile/${usertext}`}>
          <div className="profile-div">
            <div className="profile-img">
              {!pending && !error && data.data && (
                <img src={data.data.pic} alt="profile"></img>
              )}
            </div>
            <p className="username">{usertext}</p>
          </div>
        </Link>
        <Button text="Logout" btnClass="desktop-logout" onClick={logoutUser} />
      </div>

      <label htmlFor="check" onClick={navToggle} className="burger_btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="mobile-svg">
        <div className="logout-svg" onClick={logoutUser}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
    </>
  );
};

export default NavAuth;
