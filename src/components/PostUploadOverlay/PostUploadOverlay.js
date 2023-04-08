import React from 'react'
import { useState } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import uploadImageCloudinary from "../../utils/third_party_services/cloudinary";
import baseUrl from "../../utils/constants";
import './PostUploadOverlay.css'



const PostUploadOverlay = ({hideOverlay, setPostUploadOverlay}) => {
 
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [fileitem, setfileitem] = useState(null);
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const [caption, setCaption] = useState("")

  const token = localStorage.getItem("token");


  const selectImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
    };
  };

  const cropImageNow = async () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const size = 400; // set the size of the circular canvas

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    // set the size of the canvas based on the device pixel ratio
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;

    // scale the canvas by the device pixel ratio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      size,
      size
    );

    // convert the canvas to a base64-encoded data URL
    const base64Image = canvas.toDataURL("image/jpeg");
    setfileitem(base64Image);

    setButtonDisplay(true);
    
  };

  const saveChanges = async () => {
    setPostUploadOverlay(false);
    const result = await uploadImageCloudinary(fileitem);
    console.log(result);
    if (!result && !result.secure_url) {
      console.log("Error uploading image to Cloudinary");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/feed/upload/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ photo: result.secure_url , caption : caption}), // send Cloudinary URL as JSON data
      });
      console.log(JSON.stringify({ path: result.secure_url , caption}));
      const data = await response.json();
      if (response.ok) {
        // window.location.href = `/feed`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-img-overlay">
      <button className="close-btn" onClick={()=>(setPostUploadOverlay(false))}>
        <i className="fas fa-times"></i>
      </button>
      <div className="profile-pic-form">
        <>
          {!src && <div className="selected-image" ><h2>Choose Image</h2></div>}
          {src && (
            <div>
              <ReactCrop
                src={src}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />
            </div>
          )}
          <div className='post-form-control'>
            <label className="post-form-label">Caption</label>
            <input 
            type="text" 
            className="post-form-input"
            onChange={(e)=>(setCaption(e.target.value))}
            value = {caption}
            />
          </div>
           
        </>
        

        <div className="crop-btns">
          <label htmlFor="inputFile">
            Add Image
            <input
              type="file"
              accept="image/*"
              id="inputFile"
              onChange={(e) => {
                selectImage(e.target.files[0]);
              }}
            />
          </label>
          {src && (
            <button onClick={cropImageNow} className="btn">
              Preview
            </button>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: output }}
          className="generated-profile-pic"
        ></div>
        {buttonDisplay && (
          <button className="btn save-btn" onClick={saveChanges}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default PostUploadOverlay