import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import '../styles/SocietyDetailScreen.css'
import Modal from "../components/Modal";
import UpdateSocietyFormComponent from "../components/UpdateSocietyFormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteSocietyURL } from "../endPointUrls";
import {SocietiesScreenRoute} from '../routes';
import axios from "axios";



const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const user_id = getRoleORImageOREmailORId(4);
  const [modalStatus, setModalStatus] = useState(false);
  const [societyData, setSocietyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const numericId = parseInt(id);
  const openModal = () => {
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }
  const handleDeleteSociety = async () => {
    if (!id) {
      alert("Society ID is missing!");
      return;
    }
  
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this society? This action cannot be undone."
    );
  
    if (!confirmDelete) return;
  
    try {
      setLoading(true);
      console.log(`Deleting society with URL: ${DeleteSocietyURL}${id}`); // Debugging log
      await axios.delete(`${DeleteSocietyURL}${id}`);
      alert("Society deleted successfully!");
      navigate(SocietiesScreenRoute); // Redirect to societies list
    } catch (error) {
      console.error("Error deleting society:", error);
      alert("Failed to delete society. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {(userRole == 'admin' && user_id === societyData?.admin_id) &&
          <div className="admin-actions">
            <button className="editSociety-btn" onClick={openModal}>Edit Society </button>
            <button className="DeleteSociety-btn" onClick={handleDeleteSociety} disabled = {loading}>
               {loading ? "Deleting..." : "Delete Society"}
            </button>
          </div>
        }
        <SocietyDetails setSocietyData={setSocietyData} />
      </div>
      {
        modalStatus && <Modal showModal={modalStatus} closeModal={closeModal}>
          <UpdateSocietyFormComponent societyData={societyData} setModalStatus={setModalStatus} />
        </Modal>
      }
    </div>
  );
};

export default SocietyDetailsScreen;
