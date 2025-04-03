import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementsComponent = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements">
      <h2>Announcements</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement">
          <h3>{announcement.subject}</h3>
          <p>{announcement.body}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsComponent;