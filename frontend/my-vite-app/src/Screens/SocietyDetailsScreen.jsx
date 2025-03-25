import React from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import '../styles/SocietyDetailScreen.css'

const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1)

  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {userRole &&
          <div className="admin-actions">
            <button className="editSociety-btn">Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
          </div>
        }
        <SocietyDetails />
      </div>
    </div>
  );
};

export default SocietyDetailsScreen;
