import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import '../styles/SocietyDetailScreen.css'
import Modal from "../components/Modal";
import UpdateSocietyFormComponent from "../components/UpdateSocietyFormComponent";


const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const user_id = getRoleORImageOREmailORId(4);
  const [modalStatus, setModalStatus] = useState(false);
  const [societyData, setSocietyData] = useState(null);
  const openModal = () => {
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }


  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {(userRole == 'admin' && user_id === societyData?.admin_id) &&
          <div className="admin-actions">
            <button className="editSociety-btn" onClick={openModal}>Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
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
