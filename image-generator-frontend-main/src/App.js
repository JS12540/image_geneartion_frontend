import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageData, setImageData] = useState('');

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/generate_image', {
        prompt,
        num_images: numImages,
      });

      setImageData(response.data.image_data);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <h1>Flare Stack Image Generator</h1>
      <div>
        <label>Prompt:</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div>
        <label>Number of Images:</label>
        <input type="number" value={numImages} onChange={(e) => setNumImages(e.target.value)} />
      </div>
      <button onClick={handleGenerateImage}>Generate Image</button>
      {imageData && (
        <div>
          <h2>Generated Image</h2>
          <img src={`data:image/jpeg;base64,${imageData}`} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default App;
