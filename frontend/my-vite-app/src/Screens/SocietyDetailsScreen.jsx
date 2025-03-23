import React from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";

const SocietyDetailsScreen = () => {

  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        <SocietyDetails />
      </div>
    </div>
  );
};

export default SocietyDetailsScreen;
