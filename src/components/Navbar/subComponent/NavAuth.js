import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Button from '../../Button/Button';

const NavAuth = () => {
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/feed">Feed</Link>
            </li>
            <li>
              <Link to="/question">Questions</Link>
            </li>
          </ul>
        </div>
        <div className="search-div">
          <input type="text" className="input" placeholder="Search" />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
      <div className="nav-links-list-b">
        {/* <Button text='Ask Question' /> */}
        <div className="profile-div">
          <div className="profile-img"></div>
          <p className="username">Hasan Faraz</p>
        </div>
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
