import { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ProfileImgOverlay.css'

  
function ProfileImgOverlay({setChangePicOverlay}) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [buttonDisplay, setButtonDisplay] = useState(false)

  const token = localStorage.getItem("token");
  
  const selectImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
      
    };
  };
  
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const size = 100; // set the size of the circular canvas
  
    canvas.width = size;
    canvas.height = size;
  
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
  
    // set the size of the canvas based on the device pixel ratio
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
  
    // scale the canvas by the device pixel ratio
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  
    // create a circular path
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, 2*Math.PI);
    ctx.closePath();
    ctx.clip();
  
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
      size,
    );
  
    // convert the canvas to a base64-encoded data URL
    const base64Image = canvas.toDataURL('image/jpeg');
  
    // set the output as a background image of a div element
    const div = document.createElement('div');
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundImage = `url(${base64Image})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.borderRadius = '50%'
    setOutput(div.outerHTML);
    setButtonDisplay(true);
   
  };

  function dataURLtoFile(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'image.jpg', {type:mime});
  }
  

  const saveChanges = async () => {
    setChangePicOverlay(false);
    try {
      const formData = new FormData();
      formData.append('photo', dataURLtoFile(output));
      const response = await fetch('http://localhost:8000/profile/photo/', {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data",
          'x-auth-token': token
        },
        body: formData
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  return (
    <div className="profile-img-overlay">
        
        <button className="close-btn" onClick={()=> setChangePicOverlay(false)}>
            <i className="fas fa-times"></i>
        </button>
        <div className='profile-pic-form'>
            {!src && <div className='selected-image'></div>}
            {src && (
                <div>
                    <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} /> 
                </div>
            )}

            <div className='crop-btns'>
                <label htmlFor='inputFile'>
                    Add Image
                    <input
                        type="file"
                        accept="image/*"
                        id = "inputFile"
                        onChange={(e) => {
                        selectImage(e.target.files[0]);
                        }}
                    />
                </label>
                {src && (<button onClick={cropImageNow} className = "btn">Preview</button>)}
            </div>
            <div dangerouslySetInnerHTML={{ __html: output }} className = 'generated-profile-pic'></div>
            {buttonDisplay && (<button className = "btn save-btn" onClick={saveChanges}>Save Changes</button>)}
        </div>
    </div>
  );
}
  
export default ProfileImgOverlay;
