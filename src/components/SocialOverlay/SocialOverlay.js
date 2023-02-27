import React from 'react'
import './SocialOverlay.css'
import ProfileOverview from '../ProfileOverview/ProfileOverview';

const SocialOverlay = ({setSocialToggler, overlayID, followers, following}) => {
    const data = (overlayID === "following") ? (following) : (followers);

  return (
    <div className='social-overlay'>
        <button className="close-btn" onClick = {()=> setSocialToggler(false)}>
          <i className="fas fa-times"></i>
        </button>
        <div className='social-container'>
            <p className='social-title'>{overlayID}</p>
            {data.map((index, elem)=><ProfileOverview key = {index}/>)}
            <ProfileOverview/>
        </div>
    </div>
  )
}

export default SocialOverlay