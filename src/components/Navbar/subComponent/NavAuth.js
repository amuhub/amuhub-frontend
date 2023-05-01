import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import isAuthenticated from "../../../utils/isAuth";
import { useFetchToken } from "../../../utils/useFetch";
import baseUrl from "../../../utils/constants";
import ProfileOverview from "../../ProfileOverview/ProfileOverview";
import useDebounce from "../../../utils/debounceHook";
import cross from "../../../assets/navbar/multiply-svgrepo-com.svg";

const NavAuth = ({ usertext, setHeight }) => {
  const [menu, setmenu] = useState(false);
  const [searchResultsDisplay, setSearchResultsDisplay] = useState(false);
  // const [showCross, setShowCross]
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const isEmpty = !searchData || searchData.length === 0;

  const navToggle = (e) => {
    setmenu(!menu);
  };

  const token = localStorage.getItem("token");

  const { data, pending, error } = useFetchToken(
    `${baseUrl}/profile/${usertext}`,
    token
  );

  const logoutUser = () => {
    if (isAuthenticated()) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
    }
  };

  const searchClose = ()=>{
    setQuery("")
    setSearchResultsDisplay(false)
  }

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
      const res = await fetch(URL);
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
            {query && <div className="search-cancel" onClick = {searchClose}>
              <img src={cross} alt="close-btn" />
            </div>}
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
                    pic = {profile.profile.pic}
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
    </>
  );
};

export default NavAuth;
