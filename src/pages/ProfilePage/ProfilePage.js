import React, { useState } from 'react'
import './ProfilePage.css'
import { Outlet, Link, NavLink } from 'react-router-dom'
import Tag from '../../components/Tag/Tag'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import profileImg from '../Post_Overlay/images/img.png'
import SocialOverlay from '../../components/SocialOverlay/SocialOverlay' 
import { useParams } from 'react-router-dom'
import { useFetch, useFetchToken } from "../../utils/useFetch.js";
import { InfinitySpin } from "react-loader-spinner";
import { decodeToken } from 'react-jwt'
import baseUrl from '../../utils/constants'
import ProfileImgOverlay from '../../components/ProfileImgOverlay/ProfileImgOverlay'
import isAuthenticated from '../../utils/isAuth'

 

const ProfilePage = () => {
    const token = localStorage.getItem('token')
    const {username} = useParams();
    const [isFollowed, setIsFollowed] = useState(true)
    const [tags, setTags] = useState(["Css", "Computer Sc.", "Electrical Engineering", "Management Studies"])
    const [formToggler, setFormToggler] = useState(false)
    // const [dropdownToggle, setDropdownToggle] = useState(false)
    const [socialToggler, setSocialToggler] = useState(false)
    const [overlayId, setOverlayId] = useState("")
    const [changePicOverlay, setChangePicOverlay] = useState(false);
    const isLoggedInUser = isAuthenticated() === username;

    

    const formToggle = ()=>{
        setFormToggler(!formToggler)
    }
    const follow = ()=>{
        setIsFollowed(!isFollowed)
    }
    // const dropdown = ()=>{
    //     setDropdownToggle(!dropdownToggle)
    // }
    const socialToggle = (e)=>{
        e.preventDefault()
        setOverlayId(e.currentTarget.id)
        console.log(e.currentTarget.id);
        setSocialToggler(true);
    }

    const { data, pending, error } = useFetch(`${baseUrl}/profile/` + username);
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
                        <div className='img-edit-overlay' onClick={()=> setChangePicOverlay(true)}>
                            <i className="far fa-edit"></i>
                        </div>
                    </div>
                    <div className='profile-info-container'>
                        <div className='profile-info'>
                            <div className='info-inner'>
                                <p className='profile-name'>{data.data.username}</p>
                                {!isLoggedInUser && <Link to='#' className = {`btn-sec ${isFollowed ? 'followed' : ''}`} onClick = {follow}>
                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                </Link>}
                                {isLoggedInUser && <Link to='#' className = {`btn btn-sec`} onClick = {formToggle}>
                                    Edit Profile
                                </Link>}
                            </div>
                            
                            <p className='bio'>{data.data.bio}</p>
                            <div className='location'>
                                <p><i class="fas fa-map-marker-alt"></i>{data.data.location}</p>
                                <p><i class="fas fa-graduation-cap"></i>{data.data.department}</p>
                            </div> 
                        </div>
                        <div className='stats'>
                            <Link to = "" id = "followers" onClick = {socialToggle}>
                                <div className='stats-item' >
                                    {data.data.follower.length}<span>followers</span>
                                </div>
                            </Link> 
                            <Link to = "" id = "following" onClick = {socialToggle}>
                                <div className='stats-item'>
                                {data.data.following.length}<span>following</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Dropdown menu  */}
                    
                    {/* <div className = "profile-options-container">
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
                    </div> */}
                </div>
                <div className='profile-links'>
                    {/* <NavLink to = "/profile" className= "links">Profile</NavLink> */}
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
    {formToggler && <ProfileEditForm 
                    onClick = {formToggle} 
                    usernameProp = {username}
                    loc = {data.data.location}
                    dept = {data.data.department}
                    desc = {data.data.bio}/>}
    {socialToggler && <SocialOverlay 
                        setSocialToggler={setSocialToggler} 
                        overlayID = {overlayId}
                        following = {data.data.following}
                        followers = {data.data.follower}/>}
    {changePicOverlay && <ProfileImgOverlay setChangePicOverlay = {setChangePicOverlay} username={username}/>}
    </>
  )
}

export default ProfilePage;