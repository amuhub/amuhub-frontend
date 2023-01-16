import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Button from '../../Button/Button';

const NavAuth = ({setHeight}) => {
  const [menu, setmenu] = useState(false);

  const navToggle = (e) => {
    setmenu(!menu);
  };

  return (
    <>
      <div className={menu ? "nav-links-list-a active" : "nav-links-list-a"}>
        <div className="mobile-style-wrapper">
          <i className="fa fa-times" aria-hidden="true" onClick={navToggle}></i>
          <ul>
            <li>
              <Link to="/" onClick={navToggle}>Home</Link>
            </li>
            <li>
              <Link to="/feed" onClick={navToggle}>Feed</Link>
            </li>
            <li>
              <Link to="/question" onClick={navToggle}>Questions</Link>
            </li>
          </ul>
        </div>
        <div class="search-div" onClick={setHeight}>
            <div class="search-icon">
                <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <input type="text" placeholder="Search"/>
        </div>
      </div>
      <div className="nav-links-list-b">
        {/* <Button text='Ask Question' /> */}
        <Link to = "profile">
          <div className="profile-div">
            <div className="profile-img"></div>
            <p className="username">Hasan Faraz</p>
          </div>
        </Link>
      </div>
      <label for="check" onClick={navToggle} className="burger_btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </>
  );
};

export default NavAuth;
