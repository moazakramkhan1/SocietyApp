import React, { useState } from "react";
import AnnouncementsComponent from "../components/AnnouncementsComponent";
import EventsComponent from "../components/EventsComponent";
import Modal from "../components/Modal";
import AddAnnouncementForm from "../components/AddAnnouncementForm";
import AddEventForm from "../components/AddEventForm";
import getRoleORImageOREmailORId from "../getRole";

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
      {/* Buttons for Admin */}
      {userRole === "admin" && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <button
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#30a7c9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => openModal("announcement")}
          >
            Add Announcement
          </button>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#30a7c9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => openModal("event")}
          >
            Add Event
          </button>
        </div>
      )}

      {/* Announcements Section */}
      <div className="upper-section">
        <AnnouncementsComponent />
      </div>

      {/* Events Section */}
      <div className="lower-section">
        <EventsComponent />
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
  );
};

export default HomeScreen;