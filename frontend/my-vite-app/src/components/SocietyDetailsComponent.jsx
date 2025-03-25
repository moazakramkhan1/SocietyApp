import React, { useState } from "react";
import JoinNowForm from "../components/JoinNowForm";
import Modal from "../components/Modal";
import "../styles/SocietyDetailsComponent.css";

const societyData = {
  1: {
    name: "Tech Enthusiasts",
    description: "A community for tech lovers to share knowledge and collaborate.",
    committee: ["Alice Johnson", "Bob Smith", "Charlie Davis"],
    events: [
      { title: "AI Workshop", date: "March 25" },
      { title: "Hackathon", date: "April 10" },
    ],
  }
};

const user = {
  name: "John Doe",
  email: "johndoe@example.com"
};

const SocietyDetails = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const society = societyData[1];

  if (!society) {
    return <div className="error">Society not found</div>;
  }

  return (
    <div className="society-details-container">
      <h1 className="society-name">{society.name}</h1>
      <p className="description">{society.description}</p>

      <h2 className="section-title">Committee Members</h2>
      <ul className="committee-list">
        {society.committee.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>

      <h2 className="section-title">Upcoming Events</h2>
      <div className="events-container">
        {society.events.map((event, index) => (
          <div className="event-card" key={index}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </div>
        ))}
      </div>

      <button className="join-button" onClick={() => setModalStatus(true)}>Join Now</button>
      {modalStatus && (
        <Modal showModal={modalStatus} closeModal={() => setModalStatus(false)}>
          <JoinNowForm user={user} />
        </Modal>
      )}
    </div>
  );
};

export default SocietyDetails;
