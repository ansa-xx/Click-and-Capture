# app.py

import streamlit as st
from PIL import Image
import cv2
import numpy as np
from blip import generate_caption

st.set_page_config(page_title="Click and Capture", layout="centered")
st.title("📸 Click and Capture")
st.write("AI-powered image captioning using BLIP and Streamlit.")

option = st.radio("Choose input method:", ["Upload Image", "Use Webcam"])

if option == "Upload Image":
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])
    if uploaded_file:
        image = Image.open(uploaded_file).convert("RGB")
        st.image(image, caption="Uploaded Image", use_column_width=True)
        if st.button("Generate Caption"):
            caption = generate_caption(image)
            st.success(f"**Caption:** {caption}")

elif option == "Use Webcam":
    run = st.checkbox("Turn on Webcam")
    frame_window = st.image([])

    cap = cv2.VideoCapture(0)

    while run:
        success, frame = cap.read()
        if not success:
            st.error("Failed to access webcam.")
            break

        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_window.image(frame_rgb)

        if st.button("Capture and Generate Caption"):
            image = Image.fromarray(frame_rgb)
            caption = generate_caption(image)
            st.success(f"**Caption:** {caption}")
            break

    cap.release()
