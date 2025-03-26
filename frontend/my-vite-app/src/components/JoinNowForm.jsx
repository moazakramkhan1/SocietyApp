import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import '../styles/JoinNowForm.css';
import Loader from '../components/Loader'


function JoinNowForm({ isloading, adminName, adminPhone }) {
  const [selectedFile, setSelectedFile] = useState(null);
  if (isloading) {
    <Loader />
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload a payment screenshot!");
      return;
    }
    alert("Payment confirmed. Screenshot uploaded successfully!");
  };

  return (
    <div className="join-now-container">
      <h2>Join Society</h2>
      <form onSubmit={handleSubmit} className="join-form">
        <div className="form-group">
          <label>Acount Name:</label>
          <input type="text" value={adminName} readOnly />
        </div>

        <div className="form-group">
          <label>Acount Number:</label>
          <input type="text" value={adminPhone} readOnly />
        </div>

        <div className="form-group">
          <label>Payment Platform:</label>
          <input type="text" value={"jazzCash/Sadapay/Easypaisa"} readOnly />
        </div>

        <ImageUploader setSelectedFile={setSelectedFile} />
        <button type="submit" className="confirm-button">Confirm Payment</button>
      </form>
    </div>
  );
}

export default JoinNowForm;
