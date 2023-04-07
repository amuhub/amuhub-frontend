import React from "react";
import "./ProfileEditForm.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetchToken } from "../../utils/useFetch";
import baseUrl from "../../utils/constants";


const ProfileEditForm = ({
  onClick,
  loc,
  dept,
  desc,
}) => {
  const [location, setLocation] = useState(loc);
  const [department, setDepartment] = useState(dept);
  const [bio, setBio] = useState(desc);
  const [interests, setInterests] = useState([]);


  const token = localStorage.getItem("token");
  const {
    data: tagdata,
    pending: tagpending,
    error: tagerror,
  } = useFetchToken(`${baseUrl}/tag`, token);

  var options = [];
  if (!tagpending) {
    tagdata.data.map((tag) => {
      options.push({ value: tag._id, label: tag.name });
    });
  }

  const handleSelect = (selectedOption) => {
    const selectedInterests = selectedOption.map(obj => obj.value);
    setInterests(selectedInterests);  
  };

  const editPost = async (e)=>{
    e.preventDefault();
    const data = {
      bio,
      location,
      department,
      interest: interests
    }
    console.log("body", data);

    try {
      const response = await fetch(`${baseUrl}/profile/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token' : token,
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      const responseData = await response.json();
      console.log(responseData);
      onClick()
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
    
  }

  useEffect(()=>{
    console.log(interests);
  },[interests])


  

  return (
    <div className="form-overlay">
      <button className="close-btn" onClick={onClick}>
        <i className="fas fa-times"></i>
      </button>
      <div className="edit-form-container">
      <h1 className="title">Edit Profile</h1>
        <form className="profile-edit-form" onSubmit={editPost}>
          {/* <div className="form-control">
            <label className="edit-form-label">Userame</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div> */}
          <div className="form-control">
            <label className="edit-form-label">Bio</label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder = {bio}
            />
          </div>

          <div className="flex-row">
            <div className="form-control">
              <label className="edit-form-label">Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="edit-form-label">Department</label>
              <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          

          <div className="form-control">
            <Select options={options} isClearable isMulti onChange={handleSelect}/>
          </div>

          <div className="flex-row">
            <input type="submit" value="Save Changes" className="btn btn-block" />
            <button class="btn btn-red" onClick={onClick}>Cancel</button>
          </div>

          
        </form>
      </div>
      
    </div>
  );
};

export default ProfileEditForm;
