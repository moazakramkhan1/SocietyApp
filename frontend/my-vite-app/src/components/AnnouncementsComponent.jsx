import React, { useEffect, useState } from "react";
import "../styles/Announcements.css";
import axios from "axios";
import { getALLannouncements } from "../endPointUrls";
import Loader from "../components/Loader";

function AnnouncementsComponent() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const response = await axios.get(getALLannouncements);
                setAnnouncements(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {announcements.length === 0 ? <p>No Announcements to display</p> : announcements.map((item) => (
                <div key={item.id} className="announcement-card">
                    <div className="info">
                        <h3>{item.subject}</h3>
                        <p>{item.body}</p>
                        <p className="created-at">Created At: {new Date(item.created_at).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AnnouncementsComponent;
