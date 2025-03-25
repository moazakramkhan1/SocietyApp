import { useState } from 'react'
import SocietyComponent from "../components/SocietyComponent"
import SideNavbar from "../components/SideNavbar"
import '../styles/SocietiesScreen.css'
import Navbar from "../components/Navbar"
import getRoleORImageOREmail from "../getRole"
import CreateSocietyFormComponent from "../components/CreateSocietyFormComponent"
import Modal from '../components/Modal'

function SocietiesScreen() {
  const userRole = getRoleORImageOREmail(1)
  const [modalStatus, setModalStatus] = useState(false);
  const [societyData, setSocietyData] = useState(null);
  const openModal = (type) => {
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }
  return (
    <div className="societies-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        <h1 className="page-title">Societies</h1>
        {userRole === 'admin' &&
          <div className="admin-actions">
            <button className="createSociety-btn" onClick={() => setModalStatus(true)}>Create Society </button>
            <button className="editSociety-btn">Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
          </div>}
        <SocietyComponent societyData={societyData} />
      </div>
      {
        modalStatus && <Modal showModal={modalStatus} closeModal={closeModal}>
          <CreateSocietyFormComponent setSocietyData={setSocietyData} setModalStatus={setModalStatus} />
        </Modal>
      }
    </div>
  );
}

export default SocietiesScreen;