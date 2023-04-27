import "./Navbar.css";
import NavAuth from "./subComponent/NavAuth";
import NavNoAuth from "./subComponent/NavNoAuth";
import cross from "../../assets/navbar/multiply-svgrepo-com.svg";
import React, { useState } from "react";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import baseUrl from "../../utils/constants";
import useDebounce from "../../utils/debounceHook";


const Navbar = () => {
  const [auth, setauth] = useState(false);
  const [usertext, setusertext] = useState("");
  const [dropDownSearchHeight, setDropDownSearchHeight] = useState(false);
  const [searchResultsDisplay, setSearchResultsDisplay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const setHeight = () => {
    setDropDownSearchHeight(!dropDownSearchHeight);
    
  };

  const closeDropSearch = (e) => {
    setDropDownSearchHeight(false);
    setSearchResultsDisplay(false)
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
  },[]);

  const changeHandler = (e)=>{
    e.preventDefault();
    setSearchQuery(e.target.value)
  }
  const prepareSearchQuery = (query)=>{
    const url = `${baseUrl}/profile/?search=${query}`
    return encodeURI(url);
  }

  const searchProfiles = async ()=> {
    
    if(!searchQuery || searchQuery.trim === "") return;

    const URL = prepareSearchQuery(searchQuery)

    try{
      const res = await fetch(URL)
      if(res.ok){
        const data = await res.json()
        console.log(data);
      }
    }catch(err){
      console.log(err);
    }
    
  }

  useDebounce(searchQuery, 500, searchProfiles)

  return (
    <>
      <nav className="fixed-nav">
        <h1 className="nav_logo">
          amu<span>hub</span>
        </h1>
        {auth ? (
          <NavAuth usertext={usertext} setHeight={setHeight}/>
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
          onFocus= {()=> (setSearchResultsDisplay(true))}
          value = {searchQuery}
          onChange= {changeHandler}/>
          <div className="drop-search-cancel" onClick={closeDropSearch}>
            <img src={cross} alt="close-btn"/>
          </div>
        
        </div>
      </div>
      {searchResultsDisplay && <div className="drop-down-search-results"></div>}
    </>
  );
};

export default Navbar;
