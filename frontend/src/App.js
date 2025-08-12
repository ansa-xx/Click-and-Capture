import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import './App.css';

function App() {
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    sendImage(blob);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    sendImage(file);
  };

  const sendImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image, "image.jpg");

    try {
      const res = await axios.post("http://localhost:8000/caption", formData);
      setCaption(res.data.caption);
    } catch (err) {
      console.error("Error generating caption:", err);
      setCaption("Error generating caption.");
    }
  };

  return (
    <div className="App">
      <h1>📸 Click-and-Capture</h1>

      <input type="file" accept="image" onChange={handleFileChange} />
      <p>or</p>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={captureImage}>Capture Image and Generate Caption</button>

      {imagePreview && (
        <div>
          <h3>🖼️ Preview:</h3>
          <img src={imagePreview} alt="Preview" width="300" />
        </div>
      )}

      {caption && (
        <div>
          <h3>📝 Generated Caption:</h3>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
}

export default App;
