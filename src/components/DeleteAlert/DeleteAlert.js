import React from 'react'
import baseUrl from '../../utils/constants';
import isAuthenticated from '../../utils/isAuth';
import Button from '../Button/Button';
import './DeleteAlert.css'
import axios from 'axios';

const DeleteAlert = ({text, overlayToggle, deleteItemId, deleteURL}) => {

    const username = isAuthenticated()
    const token = localStorage.getItem("token")

    const apiRedirectMapping = {

        "post/delete" : `/profile/${username}`,
        "question" : `/question/`
    }

    const deleteItem = async () =>{

        const url = `${baseUrl}/${deleteURL}/${deleteItemId}`
        const res = axios.delete(url, {
            "headers" : {
                "Content-Type" : "application/json",
                "x-auth-token" : token
            }
        })

        if(!(deleteURL in  apiRedirectMapping)) overlayToggle(false)
        // else if(deleteURL === "post/delete") continue
    }

  return (
    <div className='delete_overlay'>
        <div className='delete-container'>
            <p className='delete-msg'>{text}</p>
            <div className='flex-row'>
                <Button text= "Confirm" onClick={deleteItem}/>
                <Button text= "Cancel" btnClass = "delete-btn-red" onClick={()=> overlayToggle(false)}/>
            </div>
        </div>
    </div>
  )
}

export default DeleteAlert