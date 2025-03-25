import { useEffect, useState } from 'react'
import SocietyComponent from "../components/SocietyComponent"
import SideNavbar from "../components/SideNavbar"
import '../styles/SocietiesScreen.css'
import Navbar from "../components/Navbar"
import getRoleORImageOREmail from "../getRole"
import CreateSocietyFormComponent from "../components/CreateSocietyFormComponent"
import { AllSocietiesURL } from '../endPointUrls';
import Modal from '../components/Modal'
import axios from 'axios';

function SocietiesScreen() {
  const userRole = getRoleORImageOREmail(1)
  const [modalStatus, setModalStatus] = useState(false);
  const [societies, SetSocieties] = useState([])
  const [error, setError] = useState('')
  const [refresh, setRefresh] = useState(0)
  const openModal = (type) => {
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }
  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await axios.get(AllSocietiesURL);
        SetSocieties(response.data);
      }
      catch (err) {
        setError('Something went wrong!');
      }
    };
    fetchSocieties();
  }, [refresh])
  const handleRefresh = () => {
    setRefresh((prev) => prev + 1)
  }
  return (
    <div className="societies-screen">
      <Navbar />
      <SideNavbar />
      <div className="content1">
        <h1 className="page-title">Societies</h1>
        {userRole === 'admin' &&
          <div className="admin-actions">
            <button className="createSociety-btn" onClick={() => setModalStatus(true)}>Create Society </button>
          </div>}
        <SocietyComponent societies={societies} />
      </div>
      {
        modalStatus && <Modal showModal={modalStatus} closeModal={closeModal}>
          <CreateSocietyFormComponent setModalStatus={setModalStatus} handleRefresh={handleRefresh} />
        </Modal>
      }
    </div>
  );
}

export default SocietiesScreen;