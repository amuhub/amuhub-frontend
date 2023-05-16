const uploadImageCloudinary = async (fileitem) => {
  // Upload image to Cloudinary
  const data = new FormData();
  data.append("file", fileitem);
  data.append("upload_preset", "b4h2nbgm"); // replace with your own upload preset name
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dtt5pe9sl/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default uploadImageCloudinary;
