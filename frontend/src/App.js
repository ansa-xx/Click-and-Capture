import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import './App.css';

function App() {
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [inputMethod, setInputMethod] = useState("upload");
  const webcamRef = useRef(null);

  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    setCaption("");
    setImagePreview(null);
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    setImagePreview(imageSrc);
    sendImage(blob);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
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

      <div className="method-toggle">
        <label>
          <input
            type="radio"
            name="method"
            value="upload"
            checked={inputMethod === "upload"}
            onChange={() => handleInputMethodChange("upload")}
          />
          Upload Image
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="webcam"
            checked={inputMethod === "webcam"}
            onChange={() => handleInputMethodChange("webcam")}
          />
          Use Webcam
        </label>
      </div>

      {inputMethod === "upload" && (
        <div className="upload-section">
          <input type="file" accept="image" onChange={handleFileChange} />
        </div>
      )}

      {inputMethod === "webcam" && (
        <div className="webcam-section">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button className="capture-btn" onClick={captureImage}>
            Capture Image and Generate Caption
          </button>
        </div>
      )}

      {imagePreview && (
        <div className="preview-section">
          <h3>🖼️ Preview:</h3>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      {caption && (
        <div className="caption-section">
          <h3>📝 Generated Caption:</h3>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
}

export default App;
