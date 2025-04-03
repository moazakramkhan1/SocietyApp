import React, { useEffect, useState } from "react";
import axios from "axios";

const EventsComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events">
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className="event">
          <img src={event.logo} alt={event.name} />
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsComponent;