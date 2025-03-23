import React from "react";
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
  },
  2: {
    name: "Music Lovers",
    description: "A society for music enthusiasts to explore different genres and instruments.",
    committee: ["David Lee", "Emma Watson", "John Carter"],
    events: [
      { title: "Jazz Night", date: "March 30" },
      { title: "Rock Concert", date: "April 15" },
    ],
  },
};

const SocietyDetails = () => {
  const society = societyData[2];

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
      <button className="join-button">Join Now</button>
    </div>
  );
};

export default SocietyDetails;
