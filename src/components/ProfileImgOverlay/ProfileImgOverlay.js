import { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./ProfileImgOverlay.css";
import uploadImageCloudinary from "../../utils/third_party_services/cloudinary";
import baseUrl from "../../utils/constants";

function ProfileImgOverlay({ setChangePicOverlay, username }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [fileitem, setfileitem] = useState(null);
  const [buttonDisplay, setButtonDisplay] = useState(false);

  const token = localStorage.getItem("token");

  const selectImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
    };
  };

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const size = 100; // set the size of the circular canvas

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    // set the size of the canvas based on the device pixel ratio
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;

    // scale the canvas by the device pixel ratio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // // create a circular path
    // ctx.beginPath();
    // ctx.arc(size/2, size/2, size/2, 0, 2*Math.PI);
    // ctx.closePath();
    // ctx.clip();

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

    // set the output as a background image of a div element
    const div = document.createElement("div");
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundImage = `url(${base64Image})`;
    div.style.backgroundSize = "cover";
    div.style.backgroundPosition = "center";
    div.style.borderRadius = "50%";
    setOutput(div.outerHTML);
    setButtonDisplay(true);
  };

  const saveChanges = async () => {
    setChangePicOverlay(false);
    const result = await uploadImageCloudinary(fileitem);
    if (!result && !result.secure_url) {
      console.log("Error uploading image to Cloudinary");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/profile/photo/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ path: result.secure_url }), // send Cloudinary URL as JSON data
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = `/profile/${username}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-img-overlay">
      <button className="close-btn" onClick={() => setChangePicOverlay(false)}>
        <i className="fas fa-times"></i>
      </button>
      <div className="profile-pic-form">
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

export default ProfileImgOverlay;
