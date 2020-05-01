// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUpload = () => {
//   const [image, setImage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const uploadImageHandler = (e) => {
//     //index 0 contains file
//     const files = e.target.files[0];
//     const formData = new FormData();
//     formData.append('upload_preset', 'sslupld');
//     formData.append('file', files);
//     setLoading(true);
//     axios
//       .post('https://api.cloudinary.com/v1_1/drnjganbw/image/upload', formData)
//       .then((res) => setImage(res.data.url))
//       .then(setLoading(false))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       <input type="file" name="file" onChange={uploadImageHandler} />
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : (
//         <img height="200px" width="200px" src={image} />
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
