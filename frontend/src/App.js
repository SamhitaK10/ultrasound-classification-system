import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setPrediction(data);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>Ultrasound Classification</h2>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
        Upload
      </button>

      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <h3>Prediction Result</h3>
          <p><strong>Class:</strong> {prediction.prediction}</p>
          <p><strong>Confidence:</strong> {prediction.confidence}</p>

        </div>
      )}
    </div>
  );
}

export default App;
