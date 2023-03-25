import "./Navbar.css";
import NavAuth from "./subComponent/NavAuth";
import NavNoAuth from "./subComponent/NavNoAuth";
import cross from "../../assets/navbar/multiply-svgrepo-com.svg"
import React, { useState } from "react";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setauth] = useState(false);
  const [ usertext, setusertext ] = useState('')
  const [dropDownSearchHeight, setDropDownSearchHeight] = useState(false);

  const setHeight = ()=>{
    setDropDownSearchHeight(!dropDownSearchHeight)
  }

  const closeDropSearch = (e)=>{
    setDropDownSearchHeight(false)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      const decoded_token = decodeToken(token);
      const is_espired = isExpired(token);
      if(!decoded_token && is_espired){
            localStorage.removeItem('token')
        } else {
            setauth(true)
            setusertext(decoded_token.user.username)
        }
    }else{
      // nothing
    }
  })

  return (
    <>
      <nav className="fixed-nav">
        <h1 className="nav_logo">
          amu<span>hub</span>
        </h1>
        {auth ? <NavAuth usertext={usertext} setHeight = {setHeight}/> : <NavNoAuth />}
      </nav>


      <div className = {dropDownSearchHeight ? 'drop-down-search drop-down-active' : 'drop-down-search'}>
        <div class="search-div">
            <div class="search-icon">
                <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <input type="text" placeholder="Search"/>
            <div className="drop-search-cancel" onClick={closeDropSearch}><img src = {cross}/></div>
        </div>
       
      </div>
    </>
  );
};

export default Navbar;
