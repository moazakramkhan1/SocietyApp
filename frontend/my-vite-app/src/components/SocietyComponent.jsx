import React from "react";
import '../styles/SocietyComponent.css'
import logo from '../static/logo.jpg'
const societies = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    description: "A community for tech lovers to share knowledge and collaborate.",
    members: 120,
    image: "",
  },
  {
    id: 2,
    name: "Music Lovers",
    description: "A society for music enthusiasts to explore different genres and instruments.",
    members: 95,
    image: "",
  },
  {
    id: 3,
    name: "Art & Design Club",
    description: "A space for creative minds to showcase and enhance their artistic skills.",
    members: 80,
    image: "",
  },
];

const SocietyComponent = () => {
  return (
    <div className="society-list">
      {societies.map((society,index) => {
        return (
        <div key={index} className="society-card">
        <img src={logo} alt={society.name} className="society-image" />
        <h2 className="society-name">{society.name}</h2>
        <p className="society-description">{society.description}</p>
        <p className="society-members">Members: {society.members}</p>
      </div>
        );
})}
    </div>
  );
};

export default SocietyComponent;
