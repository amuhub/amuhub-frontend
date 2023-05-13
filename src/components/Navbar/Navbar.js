import "./Navbar.css";
import NavAuth from "./subComponent/NavAuth";
import NavNoAuth from "./subComponent/NavNoAuth";
import cross from "../../assets/navbar/multiply-svgrepo-com.svg";
import React, { useState } from "react";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import baseUrl from "../../utils/constants";
import useDebounce from "../../utils/debounceHook";
import ProfileOverview from "../ProfileOverview/ProfileOverview";

const Navbar = () => {
  const [auth, setauth] = useState(false);
  const [usertext, setusertext] = useState("");
  const [dropDownSearchHeight, setDropDownSearchHeight] = useState(false);
  const [searchResultsDisplay, setSearchResultsDisplay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const isEmpty = !searchData || searchData.length === 0;

  const token = localStorage.getItem("token")

  const setHeight = () => {
    setDropDownSearchHeight(!dropDownSearchHeight);
  };

  const closeDropSearch = (e) => {
    setDropDownSearchHeight(false);
    setSearchResultsDisplay(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded_token = decodeToken(token);
      const is_espired = isExpired(token);
      if (!decoded_token && is_espired) {
        localStorage.removeItem("token");
      } else {
        setauth(true);
        setusertext(decoded_token.user.username);
      }
    } else {
      // nothing
    }
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "") setSearchResultsDisplay(false);
    setSearchQuery(e.target.value);
  };

  const prepareSearchQuery = (query) => {
    const url = `${baseUrl}/profile/?search=${query}`;
    return encodeURI(url);
  };

  const searchProfiles = async () => {
    if (!searchQuery || searchQuery.trim === "") return;

    const URL = prepareSearchQuery(searchQuery);

    try {
      const res = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        setSearchData(data.data);
        setSearchResultsDisplay(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useDebounce(searchQuery, 500, searchProfiles);

  return (
    <>
      <nav className="fixed-nav">
        <h1 className="nav_logo">
          amu<span>hub</span>
        </h1>
        {auth ? (
          <NavAuth usertext={usertext} setHeight={setHeight} />
        ) : (
          <NavNoAuth />
        )}
      </nav>

      <div
        className={
          dropDownSearchHeight
            ? "drop-down-search drop-down-active"
            : "drop-down-search"
        }
      >
        <div className="search-div">
          <div className="search-icon">
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={changeHandler}
          />
          <div className="drop-search-cancel" onClick={closeDropSearch}>
            <img src={cross} alt="close-btn" />
          </div>
        </div>
      </div>
      {searchResultsDisplay && (
        <div className="drop-down-search-results">
          {isEmpty ? (
            <div className="no-results">No Result Found</div>
          ) : (
            searchData.map((profile) => (
              <ProfileOverview
                key={profile._id}
                name={profile.name}
                pic = {profile.profile.pic}
                username={profile.username}
                setSearchResultsDisplay={setSearchResultsDisplay}
                setQuery={setSearchQuery}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
