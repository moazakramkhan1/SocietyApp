import { getSocietyDetailRoute } from '../routes';
import '../styles/SocietyComponent.css'
const SocietyComponent = ({ societies }) => {

  return (
    <div className="society-list">
      {societies &&
        societies.map((society, index) => {
          return (
            <div key={index} className="society-card">
              <img src={society.image} alt={society.name} className="society-image" />
              <a href={getSocietyDetailRoute(society.id)}><h2 className="society-name">{society.name}</h2></a>
              <p className="society-description">{society.description}</p>
              <p className="society-members">Members: {society.num_members}</p>
            </div>
          );
        })}
    </div>
  );
};

export default SocietyComponent;
