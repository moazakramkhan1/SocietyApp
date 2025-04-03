import React from "react";
import AnnouncementsComponent from "../components/AnnouncementsComponent";
import EventsComponent from "../components/EventsComponent";

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="upper-section">
        <AnnouncementsComponent />
      </div>
      <div className="lower-section">
        <EventsComponent />
      </div>
    </div>
  );
};

export default HomeScreen;