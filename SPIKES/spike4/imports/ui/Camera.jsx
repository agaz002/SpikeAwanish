import React, { useRef, useState } from 'react';

export function Camera() {
  // useRef gives direct access to DOM elements without re-rendering
  const videoRef = useRef(null);   // Points to the <video> element
  const canvasRef = useRef(null);  // Points to the hidden <canvas> element

  // preview holds the base64 image string after a photo is taken
  const [preview, setPreview] = useState(null);
  // streaming tracks whether the camera feed is currently active
  const [streaming, setStreaming] = useState(false);

  // Request camera access from the browser and start the video feed
  const startCamera = async () => {
    // getUserMedia prompts the user for camera permission
    // facingMode: 'environment' = rear camera on mobile
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    // Attach the camera stream to the video element
    videoRef.current.srcObject = stream;
    setStreaming(true); // Show the Take Photo button
  };

  // Capture the current video frame as a still image
  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    // Match canvas size to the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Draw the current video frame onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0);
    // Convert the canvas to a base64-encoded JPEG string
    const base64 = canvas.toDataURL('image/jpeg');
    setPreview(base64); // Display the captured photo
    // Log the first 80 chars of the base64 string to the console
    console.log('Base64:', base64.slice(0, 80) + '...');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Camera Spike</h1>
      {/* autoPlay starts the feed immediately, playsInline prevents iOS fullscreen */}
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg" />
      {/* Canvas is hidden — used only for capturing the frame */}
      <canvas ref={canvasRef} className="hidden" />
      {/* Show Start Camera button until streaming starts, then show Take Photo */}
      {!streaming ? (
        <button onClick={startCamera} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold">
          Start Camera
        </button>
      ) : (
        <button onClick={takePhoto} className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold">
          Take Photo
        </button>
      )}
      {/* Only show preview section after a photo has been taken */}
      {preview && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          {/* src={preview} renders the base64 string directly as an image */}
          <img src={preview} className="w-full rounded-lg" alt="Captured" />
        </div>
      )}
    </div>
  );
}
