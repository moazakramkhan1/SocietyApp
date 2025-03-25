import {useEffect, useState } from 'react'
import SocietyComponent from "../components/SocietyComponent"
import SideNavbar from "../components/SideNavbar"
import '../styles/SocietiesScreen.css'
import Navbar from "../components/Navbar"
import getRoleORImageOREmail from "../getRole"
import CreateSocietyFormComponent from "../components/CreateSocietyFormComponent"
import {AllSocietiesURL} from '../endPointUrls';
import Modal from '../components/Modal'
import axios from 'axios';

function SocietiesScreen() {
  const userRole = getRoleORImageOREmail(1)
  const [modalStatus, setModalStatus] = useState(false);
  const [societies, SetSocieties] = useState([])
  const openModal = (type) => {
    setModalStatus(true);
  }
  const closeModal = () => {
    setModalStatus(false);
  }
    useEffect(() => {
      const fetchSocieties = async () =>{
        try{
        const response = await axios.get(AllSocietiesURL);
        SetSocieties(response.data);
        }
        catch (err) {
            setError('Something went wrong!');
        }
      };
      fetchSocieties();
    }, []) 
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
        <SocietyComponent societies={societies} />
      </div>
      {
        modalStatus && <Modal showModal={modalStatus} closeModal={closeModal}>
          <CreateSocietyFormComponent setModalStatus={setModalStatus} />
        </Modal>
      }
    </div>
  );
}

export default SocietiesScreen;