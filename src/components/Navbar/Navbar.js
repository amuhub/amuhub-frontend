import './Navbar.css'
import NavAuth from './subComponent/NavAuth';
import NavNoAuth from './subComponent/NavNoAuth';
import React, { useState } from 'react';

const Navbar = () => {
    const [auth, setauth] = useState(true);

    return (
        <nav className="fixed-nav">
            <h1 className="nav_logo">amu<span>hub</span></h1>
            { auth ? <NavAuth/> : <NavNoAuth/> }
        </nav>
    )
}

export default Navbar