import "../styles/SocietyDetailsComponent.css";
import MyError from "../components/ErrorComponent";
import Loader from "./Loader";


const SocietyDetails = ({ SocietyData, isSocietyLoading }) => {


  if (isSocietyLoading) {
    return <Loader />;
  }
  if (!SocietyData) {
    return <MyError message="Society not found." />;
  }

  return (
    <div className="society-details-container">
      <h1 className="society-name">{SocietyData.name}</h1>
      <p className="description">{SocietyData.description}</p>

      <h2 className="section-title">Committee Members</h2>
      {Array.isArray(SocietyData.executive_memberships) && SocietyData.executive_memberships.length > 0 ? (
        <ul className="committee-list">
          {SocietyData.executive_memberships.map((member, index) => (
            <li key={`${member}-${index}`}>{member}</li>
          ))}
        </ul>
      ) : (
        <p>No committee members listed.</p>
      )}

      {Array.isArray(SocietyData.events) && SocietyData.events.length > 0 ? (
        <>
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-container">
            {SocietyData.events.map((event) => (
              <div className="event-card" key={event.id || `${event.title}-${event.date}`}>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="section-title">No upcoming events.</h2>
      )}
    </div>
  );
};

export default SocietyDetails;
