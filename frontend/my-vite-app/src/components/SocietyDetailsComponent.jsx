import "../styles/SocietyDetailsComponent.css";
import MyError from "../components/ErrorComponent";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCommitteeMembersURL, getEventsOfSociety } from "../endPointUrls";


const SocietyDetails = ({ SocietyData, isSocietyLoading }) => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommitteeMembers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(getCommitteeMembersURL);
        const committeeMembers = response.data;
        setCommitteeMembers(committeeMembers);
      } catch (e) {
        console.error("Error fetching committee members:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommitteeMembers();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${getEventsOfSociety}${SocietyData.id}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);


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
      {isLoading ? (
        <Loader />
      ) : committeeMembers.length > 0 ? (
        <ul className="committee-list">
          {committeeMembers.map((member, index) => (
            <li key={index}>{member.username} - {member.designation}</li>
          ))}
        </ul>
      ) : (
        <p>No committee members listed.</p>
      )}

      <h2 className="section-title">Upcoming Events</h2>
      {isLoading ? (
        <Loader />
      ) : events.length > 0 ? (
        <div className="events-container">
          {events.map((event) => (
            <div className="event-card" key={event.id || `${event.title}-${event.date}`}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="section-title">No upcoming events.</h2>
      )}
    </div>
  );
};

export default SocietyDetails;
