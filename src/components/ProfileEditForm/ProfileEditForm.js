import React from 'react'
import './ProfileEditForm.css'
import RichTextEditor from '../RichTextEditor/RichTextEditor'

const ProfileEditForm = ({onClick}) => {
  return (
    <div className='form-overlay'>
        <button className="close-btn" onClick = {onClick}>
          <i className="fas fa-times"></i>
        </button>
        <form className = "profile-edit-form" onSubmit = {(e) => e.preventDefault()}>
        
            <div className='form-control'>
                <label>Userame</label>
                <input type = 'text' name='username'/>
            </div>

            <div className='form-control'>
                <label>Location</label>
                <input type = 'text' name='location'/>
            </div>

            <div className='form-control'>
                <label>Location</label>
                <input type = 'text' name='location'/>
            </div>

            <div className='form-control'>
                <RichTextEditor/>
            </div>
            
            <input type='sumit' value="Save Changes" className = "btn btn-block"/>
        </form>
    </div>
  )
}

export default ProfileEditForm