import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
// import Button from '../../Button/Button';

const NavAuth = () => {

    const [menu, setmenu] = useState(false);

    const navToggle = (e) => {
        setmenu(!menu);
    }

    return ( 
        <>
            <div className={ menu ? "nav-links-list-a active" : "nav-links-list-a"}>
                <div className='mobile-style-wrapper'>
                    <i className="fa fa-times" aria-hidden="true" onClick={navToggle}></i>
                    <ul>
                        <li><a href="#"> <Link to="/">Home</Link></a></li>
                        <li><a href="#"><Link to="/feed">Feed</Link></a></li>
                        <li><a href="#">Questions</a></li>
                    </ul>
                </div>
                <div className="search-div">
                    <input type="text" className="input" placeholder="Search" />
                    <i className="fa fa-search" aria-hidden="true" ></i>
                </div>
            </div>
            <div className="nav-links-list-b">
                {/* <Button text='Ask Question' /> */}
                <div className="profile-div">
                    <div className="profile-img"></div>
                    <p className="username">Hasan Faraz</p>
                </div>
            </div>
            <label for="check" onClick={navToggle} className='burger_btn'>
                <span></span>
                <span></span>
                <span></span>
            </label> 

        </>
    );
}
 
export default NavAuth;