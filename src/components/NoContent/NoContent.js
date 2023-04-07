import React from 'react'
import noContent from "../../assets/no-content.jpg";

const NoContent = ({text}) => {
  return (
    <div style={{fontSize: "16px", textAlign: "center"}}>
        <img src = {noContent} alt = "No Content Fig" style={{width: "40%", margin : "20px auto"}}/>
        <p>{text}</p>
  </div>
  )
}

export default NoContent