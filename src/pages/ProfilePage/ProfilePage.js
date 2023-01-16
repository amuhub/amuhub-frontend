import React, { useState } from 'react'
import './ProfilePage.css'
import { Outlet, Link, NavLink } from 'react-router-dom'
import Tag from '../../components/Tag/Tag'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import profileImg from '../Post_Overlay/images/img.png' 
 

const ProfilePage = () => {
    const [isFollowed, setIsFollowed] = useState(true)
    const [tags, setTags] = useState(["Css", "Computer Sc.", "Electrical Engineering", "Management Studies"])
    const [formToggler, setFormToggler] = useState(false)

    const formToggle = ()=>{
        setFormToggler(!formToggler)
    }
    const follow = ()=>{
        setIsFollowed(!isFollowed)
    }
    
  return (
    <>
    <div className = "common-container">
        <div className = "grid-container">
            <div className='profile-container'>
                <div className='profile-div'>
                    <div className='profile-img'>
                        <img src={profileImg} alt = "xy"/>
                        <div className='img-edit-overlay'>
                            <i className="far fa-edit"></i>
                        </div>
                    </div>
                    <div className='profile-info'>
                        <p className='profile-name'>hamdan zaheer</p>
                        <div className='profile-stats'>
                            <p className='followers'><span>0</span>followers</p>
                            <p className='following'><span>0</span>following</p>
                        </div>
                        <Link to='#' className = {`btn follow-btn ${isFollowed ? 'followed' : ''}`} onClick = {follow}>
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </Link>
                    </div>
                </div>
                <div className='profile-links'>
                    <NavLink to = "/profile" className= "links">Profile</NavLink>
                    <NavLink to = "answers" className= "links">Answers</NavLink>
                    <NavLink to = "questions" className= "links">Questions</NavLink>
                    <NavLink to = "posts" className= "links">Posts</NavLink>
                </div>
                <div className="wrapper">
                    <Outlet/>
                </div>
            </div>

            <div className='tags-container'>
                <div className='header'>
                    <h1>Interests</h1>
                    <i className="far fa-edit" onClick={formToggle}></i>
                </div>
                <div className = "tags">
                    {tags.map((tag, index) => (
                        <Tag key={index} title={tag} />
                    ))}
                </div>

            </div>
        </div>
    </div>
    {formToggler && <ProfileEditForm onClick = {formToggle}/>}
    </>
  )
}

export default ProfilePage