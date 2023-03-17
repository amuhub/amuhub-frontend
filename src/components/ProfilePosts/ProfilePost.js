import React from 'react'
import './ProfilePosts.css'
import postImg from '../Post/img.png'

const ProfilePost = () => {
  return (
    
    <div className='profile-post-container'>
        <img src = {postImg} alt = "post-profile"></img>
        <div className='profile-post-overlay'>
            <span className = "post-likes">20<i class="fas fa-heart"></i></span>
            <span className = "post-comments">14<i class="fas fa-comment"></i></span>    
        </div>
    </div>

  )
}

export default ProfilePost