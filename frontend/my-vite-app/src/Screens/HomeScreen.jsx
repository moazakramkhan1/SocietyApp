import React, { useState } from "react";
import AnnouncementsComponent from "../components/AnnouncementsComponent";
import EventsComponent from "../components/EventsComponent";
import Modal from "../components/Modal";
import AddAnnouncementForm from "../components/AddAnnouncementForm";
import AddEventForm from "../components/AddEventForm";
import getRoleORImageOREmailORId from "../getRole";
import SideNavbar from "../components/SideNavbar";
import Navbar from "../components/Navbar";
import "../styles/HomeScreen.css";
import "../styles/Announcements.css";
import "../styles/Events.css";

const HomeScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const userId = getRoleORImageOREmailORId(4);
  const [modalType, setModalType] = useState(null);
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
      <SideNavbar />
      <div className="main-content">
        <Navbar />
        <div className="header">
          <h1>Announcements &amp; Events</h1>
          {userRole === "admin" || "moderator" && (
            <div className="header-actions">
              <button className="action-button" onClick={() => openModal("announcement")}>
                New Announcement
              </button>
              <button className="action-button" onClick={() => openModal("event")}>
                New Event
              </button>
            </div>
          )}
        </div>
        <section className="section announcements-section">
          <h2>Announcements</h2>
          <div className="announcements-grid">
            <AnnouncementsComponent />
          </div>
        </section>
        <section className="section events-section">
          <h2>Events</h2>
          <div className="events-grid">
            <EventsComponent />
          </div>
        </section>

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
