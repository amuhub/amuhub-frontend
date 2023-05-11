import React from 'react'
import { Link } from 'react-router-dom'
import './BottomNavbar.css'
import baseUrl from '../../utils/constants'
import { useFetchToken } from '../../utils/useFetch'
import { useState, useEffect } from 'react'
import isAuthenticated from '../../utils/isAuth'



const BottomNavbar = () => {
    const token = localStorage.getItem("token")
    const [usertext, setusertext] = useState("");

    useEffect(() => {
        setusertext(isAuthenticated())
      }, []);

    const { data, pending, error } = useFetchToken(
        `${baseUrl}/profile/${usertext}`,
        token
    );

  return (
    <div className='bottom-navbar'>
        <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="50" height="50"
                viewBox="0 0 50 50">
                <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
            </svg>
        </Link>
        

        <Link to="/feed">
            <svg class="DCxYpf" focusable="false" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" fill="none" d="M0 0h24v24H0z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#4285F4" d="M19 22h-7v-2h7c.55 0 1-.46 1-1V5a1 1 0 0 0-1-.99L12 4V2h7c1.66 0 3 1.36 3 3v14c0 1.65-1.35 3-3 3"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#EA4335" d="M12 22H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h7v2H5c-.55 0-.99.45-.99 1L4 19c0 .55.45 1 1 1h7v2z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#34A853" d="M14 13l-2.25 2.75L10 14l-4 4h12z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#FBBC04" d="M10 8c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.09.9-2 2-2s2 .9 2 2"></path></svg>
        </Link>

        <Link to="/question">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fill-rule="nonzero"/></svg>
        </Link>

        <Link to={`profile/${usertext}`}>
          <div className="profile-div">
            <div className="profile-img">
              {!pending && !error && data.data && (
                <img src={data.data.pic} alt="profile"></img>
              )}
            </div>
          </div>
        </Link>
    </div>
  )
}

export default BottomNavbar