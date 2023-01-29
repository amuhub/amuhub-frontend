import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import isAuthenticated from "../../../utils/isAuth";
import { useNavigate } from "react-router-dom";
// import Button from '../../Button/Button';

const NavAuth = ({usertext, setHeight}) => {
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate()

  const navToggle = (e) => {
    setmenu(!menu);
  };

  const logoutUser = () => {
    if(isAuthenticated()){
      localStorage.removeItem('token')
      window.location.href ='/'
    } else {

    }
  }

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
            <li>
              <Button text = "Logout" btnClass="mobile-logout" onClick={logoutUser}/>
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
        <Link to = {`profile/${usertext}`}>
          <div className="profile-div">
            <div className="profile-img"></div>
            <p className="username">{usertext}</p>
          </div>
        </Link>
        <Button text="Logout" btnClass="desktop-logout" onClick={logoutUser}/>
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
