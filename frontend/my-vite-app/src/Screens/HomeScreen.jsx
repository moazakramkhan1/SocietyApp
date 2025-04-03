import React, { useState } from "react";
import AnnouncementsComponent from "../components/AnnouncementsComponent";
import EventsComponent from "../components/EventsComponent";
import Modal from "../components/Modal";
import AddAnnouncementForm from "../components/AddAnnouncementForm";
import AddEventForm from "../components/AddEventForm";
import getRoleORImageOREmailORId from "../getRole";
import "../styles/HomeScreen.css";
import SideNavbar from "../components/SideNavbar";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  const userRole = getRoleORImageOREmailORId(1); // Get the user's role
  const userId = getRoleORImageOREmailORId(4); // Get the user's ID
  const [modalType, setModalType] = useState(null); // Track which modal to show
  const [modalStatus, setModalStatus] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
    setModalType(null);
  };

  return (
    <div className="home-screen">
      {/* Side Navbar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar />

        {/* Header Section */}
        <div className="header">
          <h1>Announcements & Events</h1>
          <div className="header-actions">
            {userRole === "admin" && (
              <>
                <button
                  className="action-button"
                  onClick={() => openModal("announcement")}
                >
                  New Announcement
                </button>
                <button
                  className="action-button"
                  onClick={() => openModal("event")}
                >
                  New Event
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          <div className="card-container">
            <h2>Announcements</h2>
            <AnnouncementsComponent />
          </div>
          <div className="card-container">
            <h2>Events</h2>
            <EventsComponent />
          </div>
        </div>

        {/* Modal for Adding Announcements or Events */}
        {modalStatus && (
          <Modal showModal={modalStatus} closeModal={closeModal}>
            {modalType === "announcement" ? (
              <AddAnnouncementForm closeModal={closeModal} userId={userId} />
            ) : (
              <AddEventForm closeModal={closeModal} userId={userId} />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;