import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import '../styles/SocietyDetailScreen.css'
import { UpdateSociety } from "../endPointUrls";
import axios from 'axios'
import { useParams } from "react-router-dom";

const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const user_id = getRoleORImageOREmailORId(4);
  const [society, setSocietyData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const {id} = useParams()

  const handleEditSociety = async () =>{

    const response = await axios.put(`${UpdateSociety}${id}`);
    


  }
  
  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {(userRole == 'admin' && user_id === society?.admin_id) &&
          <div className="admin-actions">
            <button className="editSociety-btn" onClick={handleEditSociety}>Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
          </div>
        }
        <SocietyDetails setSocietyData={setSocietyData} />
      </div>
    </div>
  );
};

export default SocietyDetailsScreen;
