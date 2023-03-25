import React from 'react'
import './ProfilePosts.css'
import { useParams } from 'react-router-dom'
import postImg from '../Post/img.png'
import { useFetch } from '../../utils/useFetch'
import baseUrl from '../../utils/constants'

const ProfilePosts = () => {
    const {username} = useParams()
    const {data, pending, error} = useFetch(`${baseUrl}/profile/` + username + "/posts")
    console.log(data);
    
  return (
    <div className = "post-grid">
        <div className='profile-post-container'>
            <img src = {postImg} alt = "post-profile"></img>
            <div className='profile-post-overlay'>
                <span className = "post-likes">20<i class="fas fa-heart"></i></span>
                <span className = "post-comments">14<i class="fas fa-comment"></i></span>    
            </div>
        </div>

        <div className='profile-post-container'>
            <img src = {postImg} alt = "post-profile"></img>
            <div className='profile-post-overlay'>
                <span className = "post-likes">20<i class="fas fa-heart"></i></span>
                <span className = "post-comments">14<i class="fas fa-comment"></i></span>
            </div>
        </div>

        <div className='profile-post-container'>
            <img src = {postImg} alt = "post-profile"></img>
            <div className='profile-post-overlay'>
                <span className = "post-likes">20<i class="fas fa-heart"></i></span>
                <span className = "post-comments">14<i class="fas fa-comment"></i></span>
            </div>
        </div>

        <div className='profile-post-container'>
            <img src = {postImg} alt = "post-profile"></img>
            <div className='profile-post-overlay'>
                <span className = "post-likes">20<i class="fas fa-heart"></i></span>
                <span className = "post-comments">14<i class="fas fa-comment"></i></span>
            </div>
        </div>
         
    </div>
  )
}

export default ProfilePosts