import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const url = "https://image-to-base64-conversion.onrender.com";

function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Make an HTTP request to your server to fetch the images
    axios.get(`${url}/images`) // Replace 'images' with the correct endpoint
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);
  

  return (
    <div>
      <h2>Images</h2>
      <div className="image-list">
        {images.map((image, index) => (
          <img key={index} src={image.myFile} alt="not showing" style={{ width: '300px', height: '300px' }} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [postImage, setPostImage] = useState({ myFile: "" });
  const fileInputRef = useRef(null);

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    alert("Image Submited Successfully");
    console.log("Image Uploaded");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ myFile: base64 });
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImage.myFile} alt="" />
        </label>

        <input
          type="file"
          label="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />

        <h3>Prajwal Bhoyar</h3>
        <span>Full Stack Developer</span>
        <br />

        <button type="button" onClick={handleSelectImage}>
          Select Image
        </button>
        <button type="submit">Submit</button>
      </form>

      {/* Include the ImageList component to display images */}
      <ImageList />
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default App;
