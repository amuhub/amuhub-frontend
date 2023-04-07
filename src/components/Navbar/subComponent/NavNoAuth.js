import React, { useState } from "react";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";

const NavNoAuth = (props) => {
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
              <Link to="/" onClick={navToggle}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about-us" onClick={navToggle}>
                about
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={navToggle}>
                contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ul className="nav-links-list-b">
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/register" className="btn">
            Sign Up
          </Link>
        </li>
      </ul>
      <label htmlFor="check" onClick={navToggle} className="burger_btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </>
  );
};

export default NavNoAuth;
