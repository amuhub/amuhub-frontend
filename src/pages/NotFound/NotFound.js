import React from 'react'
import NotFoundImg from '../../assets/not-found.jpg'

const NotFound = () => {
  return (
    <div style={{height : '90vh', maxWidth: '700px', margin: '0 auto'}}>
        <img src={NotFoundImg} alt='404 page not found'/>
    </div>
  )
}

export default NotFound