import "./Navbar.css";
import NavAuth from "./subComponent/NavAuth";
import NavNoAuth from "./subComponent/NavNoAuth";
import cross from "../../assets/navbar/multiply-svgrepo-com.svg"
import React, { useState } from "react";

const Navbar = () => {
  const [auth, setauth] = useState(true);
  const [dropDownSearchHeight, setDropDownSearchHeight] = useState(false);

  const setHeight = ()=>{
    setDropDownSearchHeight(!dropDownSearchHeight)
  }

  const closeDropSearch = (e)=>{
    setDropDownSearchHeight(false)
  }

  return (
    <>
      <nav className="fixed-nav">
        <h1 className="nav_logo">
          amu<span>hub</span>
        </h1>
        {auth ? <NavAuth setHeight = {setHeight}/> : <NavNoAuth />}
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
