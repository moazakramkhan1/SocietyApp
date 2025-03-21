import React from "react";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/SideNavbar"; 
import SocietyDetails from "../components/SocietyDetails";
import "../styles/SocietyDetailsScreen.css"; 

const SocietyDetailsScreen = () => {
  const { id } = useParams();

  return (
    <div className="society-details-screen">
      <SideNavbar />
      <div className="content">
        <SocietyDetails />
      </div>
    </div>
  );
};

export default SocietyDetailsScreen;
