# Click-and-Capture

A full-stack web application that enables users to either upload an image or capture one using their webcam, and automatically generates a descriptive natural language caption using the BLIP (Bootstrapped Language-Image Pretraining) vision-language model. The frontend is built with ReactJS and integrates react-webcam for real-time image capture, while the backend is powered by FastAPI and Hugging Face Transformers to process images and generate captions using pretrained deep learning models.

---

## Features

- Upload an image or capture one from your webcam
- Automatically generate meaningful captions for images
- Real-time preview of uploaded or captured images
- Clean and responsive UI
- Powered by FastAPI backend and React frontend
- Uses BLIP (Bootstrapped Language-Image Pretraining) model from HuggingFace Transformers

---

## Project Structure

```
Click-and-Capture/
│
├── backend/
│ ├── caption_app.py # FastAPI backend
│ └── requirements.txt # Python dependencies
│
├── frontend/
│ ├── public/ # Static assets
│ ├── src/ # React source code
│ │ ├── App.js # Main React component
│ │ └── App.css # Styling
│ ├── package.json
│ └── ...
│
├── README.md
```

---

## Requirements

Before running the app, make sure you have the following:

- Node.js and npm
- Python 3.8+
- Git

---

## Installation

1. **Clone the Repository**  
```bash
git clone https://github.com/ansa-xx/Click-and-Capture.git
cd Click-and-Capture
```
Install dependencies as required in the requirements.txt

2. **Backend setup**
```bash
uvicorn caption_app:app --host 0.0.0.0 --port 8000
```

3. **Frontend setup**

Open a new terminal:
```bash
cd frontend
npm install
npm start
```
App will be live at: http://localhost:3000

---

## Notes
- Ensure the backend is running before using the frontend.
- Webcam access will require permission in your browser.
