import React from 'react'
import './ProfileEditForm.css'
import Select from 'react-select'
import { useState } from 'react'

const ProfileEditForm = ({tags, setTags, onClick, usernameProp, loc, dept, desc}) => {
  const [username, setUsername] = useState(usernameProp)
  const [location, setLocation] = useState(loc)
  const [department, setDepartment] = useState(dept)
  const [bio, setBio] = useState(desc)
  const [interests, setInterests] = useState([])
  
  const options = [
    { value: 'css', label: 'CSS' },
    { value: 'electrical-enginnering', label: 'Electrical Engineering' },
    { value: 'computer-scince', label: 'Computer Sc' },
    { value: 'management', label: 'Management Studies' }
    
  ]
  return (
    <div className='form-overlay'>
        <button className="close-btn" onClick = {onClick}>
          <i className="fas fa-times"></i>
        </button>
        <form className = "profile-edit-form" onSubmit = {(e) => e.preventDefault()}>
        
            <div className='form-control'>
                <label>Userame</label>
                <input type = 'text' name='username'  value = {username} onChange = {()=>setUsername(username)}/>
            </div>

            <div className='flex-row'>
              <div className='form-control'>
                  <label>Location</label>
                  <input type = 'text' name='location' value = {location} onChange = {()=>setLocation(location)}/>
              </div>

              <div className='form-control'>
                  <label>Department</label>
                  <input type = 'text' name='department'  value = {department} onChange = {()=>setDepartment(department)}/>
              </div>
            </div>

            <div className='form-control'>
                <label>Bio</label>
                <input type = 'text' name='bio'  value = {bio} onChange = {()=>setBio(bio)}/>
            </div>

            <div className='form-control'>
              <Select options={options} isMulti isClearable/>
            </div>
            
            <input type='submit' value="Save Changes" className = "btn btn-block"/>
        </form>
    </div>
  )
}

export default ProfileEditForm