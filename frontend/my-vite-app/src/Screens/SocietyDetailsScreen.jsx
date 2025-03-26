import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import '../styles/SocietyDetailScreen.css'

const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const id = getRoleORImageOREmailORId(4);
  const [society, setSocietyData] = useState(null);
  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {(userRole == 'admin' && id === society?.admin_id) &&
          <div className="admin-actions">
            <button className="editSociety-btn">Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
          </div>
        }
        <SocietyDetails setSocietyData={setSocietyData} />
      </div>
    </div>
  );
};

export default SocietyDetailsScreen;
