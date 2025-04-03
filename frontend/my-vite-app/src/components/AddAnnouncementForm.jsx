import React, { useState, useEffect } from "react";
import axios from "axios";
import { mainEndpoint } from "../endPointUrls";

const AddAnnouncementForm = ({ closeModal, userId }) => {
  const [data, setData] = useState({
    subject: "",
    body: "",
    society_id: null, // Will be fetched based on admin's details
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the society ID based on the admin's user ID
    const fetchSocietyId = async () => {
      try {
        const response = await axios.get(`${mainEndpoint}/societyByAdmin/${userId}`);
        setData((prevData) => ({ ...prevData, society_id: response.data.id }));
      } catch (err) {
        console.error("Error fetching society ID:", err);
        setError("Failed to fetch society details.");
      }
    };

    fetchSocietyId();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${mainEndpoint}/announcements`, data);
      alert("Announcement added successfully!");
      closeModal();
    } catch (err) {
      console.error("Error adding announcement:", err);
      setError("Failed to add announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Announcement</h2>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={data.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Body"
        value={data.body}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading || !data.society_id}>
        {loading ? "Adding..." : "Add Announcement"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddAnnouncementForm;