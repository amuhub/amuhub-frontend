import React, { useState } from 'react'
import './ProfilePage.css'
import { Outlet, Link, NavLink } from 'react-router-dom'
import Tag from '../../components/Tag/Tag'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import profileImg from '../Post_Overlay/images/img.png' 
import { useParams } from 'react-router-dom'
import useFetch from "../../utils/useFetch.js";
import { InfinitySpin } from "react-loader-spinner";
 

const ProfilePage = () => {
    const {username} = useParams();
    const [isFollowed, setIsFollowed] = useState(true)
    const [tags, setTags] = useState(["Css", "Computer Sc.", "Electrical Engineering", "Management Studies"])
    const [formToggler, setFormToggler] = useState(false)
    const [dropdownToggle, setDropdownToggle] = useState(false)

    const formToggle = ()=>{
        setFormToggler(!formToggler)
    }
    const follow = ()=>{
        setIsFollowed(!isFollowed)
    }
    const dropdown = ()=>{
        setDropdownToggle(!dropdownToggle)
    }

    const { data, pending, error } = useFetch("http://localhost:8000/profile/" + username);
    console.log(data)

    return (
    <>
    <div className = "common-container">
        <div className = "grid-container">
            {pending && <InfinitySpin width="300" color="#6495ED" />}
            {!pending && !error && data.data && <div className='profile-container'>
                <div className='profile-section'>
                    <div className='profile-img'>
                        <img src={data.data.pic} alt = "xy"/>
                        <div className='img-edit-overlay'>
                            <i className="far fa-edit"></i>
                        </div>
                    </div>
                    <div className='profile-info'>
                        <div className='info-inner'>
                            <p className='profile-name'>{data.data.username}</p>
                            <Link to='#' className = {`btn follow-btn ${isFollowed ? 'followed' : ''}`} onClick = {follow}>
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </Link>
                        </div>
                        
                        <p className='bio'>{data.data.bio}</p>
                        {/* add location icon with location */}
                        <div className='location'>
                            <p><i class="fas fa-map-marker-alt"></i>{data.data.location}</p>
                            <p><i class="fas fa-graduation-cap"></i>{data.data.department}</p>
                        </div>
                        
                        
                        {/* <div className='profile-stats'>
                            <p className='followers'><span>0</span>followers</p>
                            <p className='following'><span>0</span>following</p>
                        </div> */}
                        
                    </div>
                    <div className = "profile-options-container">
                    <div className='profile-options' onClick={dropdown}>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <ul className = {`drop-down ${dropdownToggle ? 'drop-down-active' : ''}`}>
                            <li className='drop-down-item'>
                                Edit
                            </li>
                            <li className='drop-down-item'>
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='profile-links'>
                    <NavLink to = "/profile" className= "links">Profile</NavLink>
                    <NavLink to = "answers" className= "links">Answers</NavLink>
                    <NavLink to = "questions" className= "links">Questions</NavLink>
                    <NavLink to = "posts" className= "links">Posts</NavLink>
                </div>
                <div className="wrapper">
                    <Outlet />
                </div>
            </div>}
            

            {!pending && !error && data.data && <div className='tags-container'>
                <div className='header'>
                    <h1>Interests</h1>
                    <i className="far fa-edit" onClick={formToggle}></i>
                </div>
                <div className = "tags">
                    {tags.map((tag, index) => (
                        <Tag key={index} title={tag} />
                    ))}
                </div>

            </div>}
        </div>
    </div>
    {formToggler && <ProfileEditForm onClick = {formToggle}/>}
    </>
  )
}

export default ProfilePage