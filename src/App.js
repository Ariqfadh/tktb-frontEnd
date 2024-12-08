// App.js

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [resultText, setResultText] = useState("No results yet.");
  const [resultImage, setResultImage] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Display the selected image immediately in the UI
    setSubmittedImage(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
        setResultText("Please upload an image first.");
        return;
    }

    setResultText("Uploading and processing...");

    const formData = new FormData();
    formData.append("file", file);

    try {
        // Kirim gambar ke backend
        const response = await axios.post("https://leukolab-gyhxauhqawbbeghx.eastasia-01.azurewebsites.net/get-prediction", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        
        setResultText(`Prediction: ${response.data.predicted_class}`);
        setResultImage(submittedImage); 
    } catch (error) {
        console.error("Error during inference:", error);
        setResultText("An error occurred during inference. Please try again.");
    }
};


  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Leukolab</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">Upload</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Infer</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold">White Blood Cell Analysis</h1>
          <p className="lead text-muted">Upload your medical image to get AI-driven insights instantly.</p>
        </div>
      </section>

      {/* Image Upload Section */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h2 className="fw-semibold">Upload Your Image</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="file"
                className="form-control mt-3"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      <section className="text-center py-5">
        <div className="container">
          <h2 className="fw-semibold">Inference Results</h2>
          <div className="mt-3 p-3 bg-light border rounded">
            <p>{resultText}</p>
            {resultImage && (
              <div className="mt-4">
                <img
                  src={resultImage}
                  alt="Inference Result"
                  className="img-fluid border rounded"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
