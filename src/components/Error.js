import React from 'react'
import ErrorImg from '../assets/error.png'

const Error = () => {
  return (
    <div className='error-comp' 
    style={
        {
            display: 'flex',
            height: '90vh' ,
            flexDirection : 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            width : '80%',
            maxWidth: '500px',
            margin : '0 auto',
            padding: '30px 10px',
            textAlign: 'center'
        }
    }>
        <img src = {ErrorImg} 
        alt = "error"
        style={
            {
                marginBottom: '30px',
                height: 'auto' 
            }
        }
        />
        <h1>OOPs Something Went Wrong</h1>
    </div>
  )
}

export default Error