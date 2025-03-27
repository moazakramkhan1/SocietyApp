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


function JoinNowForm({ isloading, adminName, adminPhone }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const user_id = getRoleORImageOREmailORId(4)
  const { id } = useParams()

  const [data, setData] = useState({
    user_id: 0,
    society_id: 0,
    image: ''
  })
  if (isloading) {
    <Loader />
  }
  useEffect(() => {
    setData({
      user_id: user_id,
      society_id: id,
      image: imageURL
    })
  }, [user_id, imageURL, id])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload a payment screenshot!");
      return;
    }
    try {
      image = await UploadImage(selectedFile);
      setImageURL(image)
      await axios.post(JoinNowURL, data)
    } catch (e) {
      return <ErrorComponent message={e.message} />
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
      </form>
    </div>
  );
}

export default JoinNowForm;
