import React, { useEffect, useState } from "react";
import "../styles/Events.css";
import axios from "axios";
import { getALLevents } from "../endPointUrls";
import Loader from "../components/Loader";

function EventsComponent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get(getALLevents);
                setEvents(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {events.length === 0 ? (
                <p>No events to display</p>
            ) : (
                events.map((event) => (
                    <div key={event.id} className="event-card">
                        {event.logo && <img src={event.logo} alt={event.name} className="event-logo" />}
                        <h4>{event.name}</h4>
                        <p>{event.description}</p>
                        <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </>
    );
}

export default EventsComponent;
