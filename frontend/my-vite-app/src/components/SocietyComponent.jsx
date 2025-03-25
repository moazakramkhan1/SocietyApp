import '../styles/SocietyComponent.css'
import { SocietyDetailScreenRoute } from "../routes";
import { mainEndpoint } from '../endPointUrls';
const SocietyComponent = ({ societies }) => {

  return (
    <div className="society-list">
      {societies.map((society, index) => {
        let imageUrl = `${mainEndpoint}${society.image}`
        console.log(imageUrl)
        return (
          <div key={index} className="society-card">
            <img src={imageUrl} alt={society.name} className="society-image" />
            <a href={SocietyDetailScreenRoute}><h2 className="society-name">{society.name}</h2></a>
            <p className="society-description">{society.description}</p>
            <p className="society-members">Members: {society.members}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SocietyComponent;
