import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ImageUploader from "./ImageUploader";
import '../styles/JoinNowForm.css';
import Loader from '../components/Loader'
import { UploadImage } from '../uploadImage'
import axios from "axios";
import getRoleORImageOREmailORId from '../getRole'
import { JoinNowURL } from '../endPointUrls'
import ErrorComponent from './ErrorComponent'


function JoinNowForm({ isloading, adminName, adminPhone, setModalStatus }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const user_id = getRoleORImageOREmailORId(4)
  const { id } = useParams()
  const numericId = parseInt(id);

  const [data, setData] = useState({
    user_id: user_id,
    society_id: numericId,
    status: 'pending',
    image: ''
  });

  if (isloading) {
    return <Loader />
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload a payment screenshot!");
      return;
    }
    try {
      const image = await UploadImage(selectedFile);
      const updatedData = {
        ...data,
        image: image
      };
      setData(updatedData);
      let response = await axios.post(JoinNowURL, updatedData);
      setMessage("your request has been submitted successfully");
      setModalStatus(false);
    } catch (e) {
      console.error(e);
      return <ErrorComponent message={e.message} />;
    }
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
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default JoinNowForm;
