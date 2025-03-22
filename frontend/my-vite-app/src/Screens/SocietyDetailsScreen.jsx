import React from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetails";
import "../styles/SocietyDetailsScreen.css";

const SocietyDetailsScreen = () => {

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
